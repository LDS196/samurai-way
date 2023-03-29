import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './DialogsItem.module.css';
import {DialogUserType} from "../../../redux/dialogs-reducer";


const DialogsItem = (props: DialogUserType) => {
    let path = '/Dialogs/' + props.id
    return (
        <div className={s.dialogs__item}>
            <NavLink to={path}
                     className={({isActive}) => isActive ? s.dialogs__link + ' ' + s.active : s.dialogs__link}
            >{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;