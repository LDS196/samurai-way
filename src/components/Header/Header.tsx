import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {Avatar, Button,} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "redux/redux-store";
import { logout} from "redux/Auth-reducer";
import {selectIsAuth, selectLogin} from "redux/auth-selectors";


export const HeaderContainer= ()=> {
    const photo = useSelector((state: StateType) => state.profilePage.profile?.photos.small)
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)
    const dispatch  = useDispatch()
    return (

        <div className={s.loginBlock}>
            {isAuth
                ? <>
                    <span className={s.user}>{login}</span>
                    <Avatar src={photo}/>
                    <Button type="primary" onClick={()=>dispatch(logout())}><NavLink to={'/login'}>Log out</NavLink></Button>
                </>
                : <Button type="primary"><NavLink to={'/login'}>Login</NavLink></Button>

            }

        </div>


    )
}

