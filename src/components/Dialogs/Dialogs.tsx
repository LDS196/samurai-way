import React from 'react';

import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./DialogsMessage/Message";


const Dialogs = () => {
    let dialogs = [
        {id: 1, name: 'Viktor',},
        {id: 2, name: 'User',},
        {id: 3, name: 'Vasya',},
        {id: 4, name: 'Katya',},
        {id: 5, name: 'Olga',},
        {id: 6, name: 'Sveta',}
    ];

    let messages = [
        {id: 1, message: 'How are you',},
        {id: 2, message: 'HI Friends',},
        {id: 3, message: 'Yo Yo!',},
        {id: 4, message: 'How are you',},
        {id: 5, message: 'How are you',},
        {id: 6, message: 'How are you',}
    ];

    let dialogsElements = dialogs.map( dialog => <DialogsItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = messages.map( message => <Message message={message.message}/> )

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={s.dialogs__messages}>
                {messagesElements}

            </div>
        </div>
    )
}

export default Dialogs;