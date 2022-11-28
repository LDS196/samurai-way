import React from 'react';
import s from './Header.module.css';
function Header() {
    return(
        <header className={s.header}>
            <img className={s.header__logo}  src="https://www.humanrightslogo.net/sites/default/files/HRLogoCMYKsmall.jpg" alt="logo"/>
        </header>
    )
}
export default Header;