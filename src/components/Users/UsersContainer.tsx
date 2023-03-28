import React from 'react';
import {connect} from "react-redux";
import {
    FilterType,
    follow, getUsers,
    setCurrentPage,
    unfollow,
} from "../../redux/users-reducer";

import Preloader from "../common/Preloader/Preloader";
import {StateType} from "../../redux/redux-store";
import {compose} from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector, getUsersFilterSelector,
    getUsersSelector
} from "../../redux/users-selectors";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Users from "./Users";
import {UserType} from "../api/usersAPI";


type MapDispatchPropsType={
    follow: (id: number) => void
    unfollow: (id: number) => void
    setCurrentPage: (currentPage: number) => { type: string, currentPage: number }
    getUsers: (currentPage: number, pageSize: number,filter:FilterType) => any
}
type MapStatePropsType={
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress:  Array<number>,
    filter:FilterType
}
type OwnerProps={

}


type UsersContainerType = MapStatePropsType & MapDispatchPropsType & OwnerProps

class UsersContainer extends React.Component<UsersContainerType> {

    componentDidMount() {
        const {currentPage,pageSize,filter}= this.props
        this.props.getUsers(currentPage,pageSize,filter)
    };

    onPageChanged = (pageNumber: number) => {
        const {pageSize,filter}= this.props
        this.props.getUsers(pageNumber,pageSize,filter)
    }
    onFilterChanged = (filter: FilterType) => {
        const {pageSize}= this.props
        this.props.getUsers(1,pageSize,filter)
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
                   onFilterChanged = {this.onFilterChanged}
            />
        </>
    }
}


let mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        filter: getUsersFilterSelector(state)
    }
}

export default compose<React.FC>(
    WithAuthRedirect,
    connect<MapStatePropsType,MapDispatchPropsType,OwnerProps,StateType>(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers,})
)(UsersContainer)