import React from 'react';
import style from "./users.module.css";
import userPhoto from "../../assets/img/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/users-reducer";

import {followUser, unfollowUser} from "../api/api";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (id: number) => { type: string, id: number }
    unfollow: (id: number) => { type: string, id: number }
    toggleIsFollowingProgress:(isFetching: boolean, id:number) => ({type: string, isFetching: boolean, id:number})
    followingInProgress: []
}
const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(p => <span key={p} className={props.currentPage === p ? style.selectedPage : ''}
                                  onClick={() => {
                                      props.onPageChanged(p)
                                  }}>{p}</span>)}

            {props.users.map((u: UserType) =>
                <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="Avatar"
                                 className={style.userPhoto}/>
                        </NavLink>

                    </div>
                    <div>
                        {u.followed ? <button disabled={props.followingInProgress.some(id=> id === u.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true, u.id)

                                followUser(u.id)
                                    .then(data => {
                                        if (data.resultCode == 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.toggleIsFollowingProgress(false, u.id)
                                    })

                            }}>Follow</button> :
                            <button disabled={props.followingInProgress.some(id=> id === u.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true, u.id)
                                unfollowUser(u.id).then(data => {
                                        if (data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
                                    props.toggleIsFollowingProgress(false, u.id)
                                    })
                            }}>Unfollow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
                </div>)}
        </div>
    )
};

export default Users;