import React from 'react';
import style from "./users.module.css";
import userPhoto from "../../assets/img/user.png";
import {NavLink} from "react-router-dom";

import {InitialUsersStateType} from "../../redux/users-reducer";
import {UserType} from "../api/usersAPI";

;

type UserPropsType = {
    user: UserType
    followingInProgress: InitialUsersStateType["followingInProgress"]
    unfollow: (id: number) => any
    follow: (id: number) => any

}
const User = (props: UserPropsType) => {
    const {user, followingInProgress, unfollow, follow} = props
    return (
        <div>

                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="Avatar"
                                 className={style.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unfollow(user.id)
                                      }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          follow(user.id)
                                      }}>Follow</button>
                        }
                    </div>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>

        </div>

    )
};

export default User;