import React from 'react';
import {UserType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => any
    unfollow: (id: number) => any
    followingInProgress: []
}
const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const usersForRender=props.users.map((u: UserType) => {
        return <User key={u.id} user={u}
              followingInProgress={props.followingInProgress}
              unfollow={props.unfollow}
              follow={props.follow}/>
    })
    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
            />
            {usersForRender}
        </div>
    )
};

export default Users;