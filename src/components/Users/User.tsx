import React, {memo} from 'react';
import style from "./users.module.css";
import userPhoto from "../../assets/img/user.png";
import {NavLink} from "react-router-dom";
import {follow, unfollow} from "../../redux/users-reducer";
import {UserType} from "../api/usersAPI";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingInProgressSelector} from "../../redux/users-selectors";

type UserPropsType = {
    user: UserType
}
const User: React.FC<UserPropsType> = memo(({user}) => {
    const followingInProgress = useSelector(getFollowingInProgressSelector)

    const dispatch = useDispatch()

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
                                  dispatch(unfollow(user.id))
                              }}>Unfollow</button>

                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  dispatch(follow(user.id))
                              }}>Follow</button>
                }
            </div>
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>{'u.location.country'}</div>
            <div>{'u.location.city'}</div>

        </div>

    )
});

export default User;