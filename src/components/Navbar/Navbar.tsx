import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import Friends from "./Friends/Friends";
function Navbar(props: any) {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink className={s.item} activeClassName={s.activeLink} to="/Profile">Profile</NavLink>
            </div>
            <div>
                <NavLink className={s.item} activeClassName={s.activeLink}  to="/Dialogs">Messages</NavLink>
            </div>
            <div>
                <NavLink className={s.item} activeClassName={s.activeLink} to="/News">News</NavLink>
            </div>
            <div>
                <NavLink className={s.item} activeClassName={s.activeLink} to="/Music">Music</NavLink>
            </div>
            <div>
                <NavLink className={s.item} activeClassName={s.activeLink} to="/Settings">Settings</NavLink>
            </div>
            <div>
                <Friends state={props.state} />
            </div>
            <div>

            </div>
        </nav>
    )
}

export default Navbar;