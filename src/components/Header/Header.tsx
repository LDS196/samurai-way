import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {Avatar, Button, Typography} from "antd";
import {useSelector} from "react-redux";
import {StateType} from "../../redux/redux-store";
import { logout} from "../../redux/Auth-reducer";
import {selectIsAuth, selectLogin} from "../../redux/auth-selectors";


export const HeaderContainer= ()=> {
    const photo = useSelector((state: StateType) => state.profilePage.profile?.photos.small)
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)
    return (

        <div className={s.loginBlock}>
            {isAuth
                ? <>
                    <span className={s.user}>{login}</span>
                    <Avatar className={s.userFoto} src={photo}/>
                    <Button type="primary" onClick={logout}>Logout</Button>
                </>
                : <Button type="primary"><NavLink to={'/login'}>Login</NavLink></Button>

            }

        </div>


    )
}

