import React from 'react';
import style from "./users.module.css";
import userPhoto from "../../assets/img/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/users-reducer";


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
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {props.follow(u.id)}}>Follow</button>

                        }
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