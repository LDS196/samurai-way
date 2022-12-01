import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Friends.module.css'
import Friend from "./Friend/Friends";



function Friends(props: any) {

let friendsData = props.state.names.map( (friend: { name: any; }) => <Friend name={friend.name} /> )

    return (
        <div className={s.wrapper}>
            <div >Friends</div>
            <div className={s.items}>
                {friendsData}
            </div>
        </div>
        
    )
}

export default Friends;