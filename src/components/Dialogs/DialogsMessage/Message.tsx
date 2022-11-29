import React from 'react';
import s from './Message.module.css';

type MessagePropsType={
    message: string,
}
const Message = (props: MessagePropsType) => {
    return (
        <div className={s.dialogs__message}>{props.message}</div>
    )
}

export default Message;