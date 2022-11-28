import React from 'react';
import s from './Navbar.module.css'

function Navbar() {
    return(
        <nav className={s.nav}>
            <div><a className={s.item} href="src/components/Navbar/Navbar">Profile</a></div>
            <div><a className={`${s.item} ${s.item_active}` } href="src/components/Navbar/Navbar">Messages</a></div>
            <div><a className={s.item} href="src/components/Navbar/Navbar">News</a></div>
            <div><a className={s.item} href="src/components/Navbar/Navbar">Music</a></div>
            <div><a className={s.item} href="src/components/Navbar/Navbar">Settings</a></div>
            <div></div>
        </nav>
    )
}
export default Navbar;