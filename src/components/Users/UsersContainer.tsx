import React from 'react';
import {connect} from "react-redux";
import {
    follow, getUsers,
    setCurrentPage,
    unfollow, UsersType,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {StateType} from "../../redux/redux-store";
import {compose} from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../redux/users-selectors";


type UsersContainerType = UsersType & {
    follow: (id: number) => any
    unfollow: (id: number) => any
    setCurrentPage: (currentPage: number) => { type: string, currentPage: number }
    getUsers: (currentPage: number, pageSize: number) => any
}

class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)

    };

    onPageChanged = (pageNumber: number) => {
        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        //
        // getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items);
        //     })
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

// let mapStateToProps = (state: StateType) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
let mapStateToProps = (state: StateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
}
// let mapDispatchToProps = (dispatch: any) =>{
//     return{
//         follow: (userId:number) =>{
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId:number) =>{
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users:any) =>{
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber:number) =>{
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount:number) =>{
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching:boolean) =>{
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }
// let withRedirect = WithAuthRedirect(UsersContainer)
//
// export default connect(mapStateToProps, {
//     follow, unfollow, setCurrentPage, getUsers,
// })(withRedirect);

export default compose<React.FC>(
    // WithAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers,})
)(UsersContainer)