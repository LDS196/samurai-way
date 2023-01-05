import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './DialogsItem.module.css';
import {DialogUserType} from "../../../redux/dialogs-reducer";


const DialogsItem = (props:DialogUserType) => {
    let path = '/Dialogs/' + props.id
    return(
        <div className={s.dialogs__item}>
            <NavLink className={s.dialogs__link} to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;