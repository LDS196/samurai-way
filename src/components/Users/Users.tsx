import React from 'react';
import style from "./users.module.css";
import userPhoto from "../../assets/img/user.png";
import {NavLink} from "react-router-dom";
import { UserType} from "../../redux/users-reducer";
import axios from "axios";



type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) =>void
    users: Array<UserType>
    follow: (id: number) => {type: string, id:number}
    unfollow: (id: number) => {type: string, id:number}
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
                        {u.followed ? <button onClick={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                withCredentials:true,
                                headers:{
                                    'API-KEY': '4840b52a-30a9-4c8b-a10a-9d7d781c35d4'
                                }
                            })
                                .then(response => {
                                    if(response.data.resultCode == 0){
                                        props.unfollow(u.id)
                                    }
                                })}}>Follow</button> :
                            <button onClick={() => {

                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials:true
                                })
                                    .then(response => {
                                        if(response.data.resultCode == 0){
                                            props.follow(u.id)
                                        }
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