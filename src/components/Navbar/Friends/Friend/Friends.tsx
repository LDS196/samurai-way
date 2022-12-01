import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Friend.module.css'

function Friend(props: any) {
    return (
        <div className={s.item} >
            <a href="#"><img src="https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt="Ava"/>
            <span>{props.name}</span></a>
        </div>
        
    )
}

export default Friend;