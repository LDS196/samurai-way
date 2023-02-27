import React from 'react';
import {connect} from "react-redux";
import {
    follow, getUsers,
    setCurrentPage,
    unfollow, UsersType,
} from "../../redux/users-reducer";

import Preloader from "../common/Preloader/Preloader";
import {StateType} from "../../redux/redux-store";
import {compose} from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../redux/users-selectors";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Users from "./Users";


type UsersContainerType = UsersType & {
    follow: (id: number) => any
    unfollow: (id: number) => any
    setCurrentPage: (currentPage: number) => { type: string, currentPage: number }
    getUsers: (currentPage: number, pageSize: number) => any
}

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        const {currentPage,pageSize}= this.props
        this.props.getUsers(currentPage,pageSize)
    };

    onPageChanged = (pageNumber: number) => {
        const {pageSize}= this.props
        this.props.getUsers(pageNumber,pageSize)
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

export default compose<React.FC>(
    WithAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers,})
)(UsersContainer)