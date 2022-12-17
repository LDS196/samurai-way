import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";

let mapStateToProps = (state:any) =>{
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}
let mapDispatchToProps = (dispatch: any) =>{
    return{
        follow: (userId:number) =>{
            dispatch(followAC(userId))
        },
        unfollow: (userId:number) =>{
            dispatch(unfollowAC(userId))
        },
        setUsers: (users:any) =>{
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber:number) =>{
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount:number) =>{
            dispatch(setTotalUsersCountAC(totalCount))
        }
    }
}

export default connect( mapStateToProps,mapDispatchToProps) (Users);