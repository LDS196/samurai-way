import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.css'

function Navbar(props: any) {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink className={({isActive})=>isActive? s.item + ' ' + s.activeLink:s.item}
                         to="/Profile">Profile</NavLink>
            </div>
            <div>
                <NavLink className={({isActive})=>isActive? s.item + ' ' + s.activeLink:s.item}
                         to="/Dialogs">Messages</NavLink>
            </div>
            <div>
                <NavLink className={({isActive})=>isActive? s.item + ' ' + s.activeLink:s.item}
                         to="/News">News</NavLink>
            </div>
            <div>
                <NavLink className={({isActive})=>isActive? s.item + ' ' + s.activeLink:s.item}
                         to="/Music">Music</NavLink>
            </div>
            <div>
                <NavLink className={({isActive})=>isActive? s.item + ' ' + s.activeLink:s.item}
                         to="/Settings">Settings</NavLink>
            </div>
            <div>
                <NavLink className={({isActive})=>isActive? s.item + ' ' + s.activeLink:s.item}
                         to="/Users">Users</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;