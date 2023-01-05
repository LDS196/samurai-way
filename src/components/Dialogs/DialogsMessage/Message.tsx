import React from 'react';
import s from './Message.module.css';
import {DialogMessageType} from "../../../redux/dialogs-reducer";


const Message = (props: DialogMessageType) => {
    return (
        <div className={s.dialogs__message}>{props.message}</div>
    )
}

export default Message;