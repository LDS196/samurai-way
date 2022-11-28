import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";


const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                <DialogsItem name={'Viktor'} id={1}/>
                <DialogsItem name={'Vasya'} id={2}/>
                <DialogsItem name={'User'} id={3}/>
                <DialogsItem name={'Katya'} id={4}/>
                <DialogsItem name={'Olga'} id={5}/>
                <DialogsItem name={'Sveta'} id={6}/>
            </div>
            <div className={s.dialogs__messages}>
                <div className={s.dialogs__message}>How are you?</div>
                <div className={s.dialogs__message}>HI</div>
                <div className={s.dialogs__message}>Yo YO</div>
            </div>
        </div>
    )
}
export default Dialogs;