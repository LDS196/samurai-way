import React, {memo} from 'react';
import style from "./users.module.css";
import userPhoto from "../../assets/img/user.png";
import {NavLink} from "react-router-dom";
import {follow, unfollow} from "redux/users-reducer";
import {UserType} from "../api/usersAPI";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingInProgressSelector} from "redux/users-selectors";
import {Button} from "antd";

type UserPropsType = {
    user: UserType
}
const User: React.FC<UserPropsType> = memo(({user}) => {
    const followingInProgress = useSelector(getFollowingInProgressSelector)

    const dispatch = useDispatch()

    return (
        <div className={style.userContainer} >
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="Avatar"
                         className={style.userPhoto}/>
                </NavLink>
                <div>
                    {user.followed
                        ? <Button size={"small"}
                                  type="primary"
                                  disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() =>dispatch(unfollow(user.id))}>
                            Unfollow</Button>

                        : <Button size={"small"}
                                  type="primary"
                                  disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() =>dispatch(follow(user.id))}>
                            Follow</Button>
                    }
                </div>
            </div>

            <div className={style.userInfo}>
                <div>UserName: {user.name}</div>
                <div>User status: {user.status}</div>
                <div>UserId: {user.id}</div>
            </div>
        </div>

    )
});

export default User;