import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {HeaderContainerType} from "./HeaderContainer";


function Header(props:HeaderContainerType) {
    return(
        <header className={s.header}>
            <img className={s.header__logo}  src="https://www.humanrightslogo.net/sites/default/files/HRLogoCMYKsmall.jpg" alt="logo"/>
        <div className={s.loginBlock}>
            {props.isAuth?props.login: <NavLink to={'/login'}>Login</NavLink> }


        </div>
        </header>

    )
}
export default Header;