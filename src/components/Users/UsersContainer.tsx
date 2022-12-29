import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowingProgress,
    unfollow, UsersType, UserType
} from "../../redux/users-reducer";
import Users from "./Users";

import Preloader from "../common/Preloader/Preloader";
import {StateType} from "../../redux/redux-store";
import {getUsers} from "../api/api";

type UsersContainerType = UsersType & {
    follow: (id: number) => { type: string, id: number }
    unfollow: (id: number) => { type: string, id: number }
    setUsers: (users: UserType[]) => { type: string, users: any }
    setCurrentPage: (currentPage: number) => { type: string, currentPage: number }
    setTotalUsersCount: (totalCount: number) => { type: string, count: number }
    toggleIsFetching: (isFetching: boolean) => { type: string, isFetching: boolean }
    toggleIsFollowingProgress:(isFetching: boolean, id:number) => ({type: string, isFetching: boolean, id:number})
}

class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,{
        //     withCredentials:true
        // })

        getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        })
    };

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
        //     {
        //         withCredentials:true
        //     })
        getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })
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
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
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

export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching,toggleIsFollowingProgress
})(UsersContainer);