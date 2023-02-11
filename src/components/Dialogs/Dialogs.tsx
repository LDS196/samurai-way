import React from 'react';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./DialogsMessage/Message";

import {DialogsPageType} from "../../redux/dialogs-reducer";
import AddMessageForm from "./DialogsMessage/AddMessageForm";

export type DialogsType = {
    addDialog: (value: string) => void
    dialogsPage: DialogsPageType
    isAuth: boolean
}

const Dialogs = (props: DialogsType) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(dialog => <DialogsItem key={dialog.id}
                                                                   name={dialog.name}
                                                                   id={dialog.id}/>);
    let messagesElements = state.messages.map(message => <Message key={message.id}
                                                                  message={message.message} id={message.id}/>)


    const addNewMessage = (values: any) => {
        props.addDialog(values.NewMessageBody)
    }
    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogs__items}>
                    {dialogsElements}
                </div>
                <div className={s.dialogs__messages}>
                    {messagesElements}
                </div>
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>


    )
}

export default Dialogs;

