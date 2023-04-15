import React from 'react';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./DialogsMessage/Message";

import {DialogsPageType} from "../../redux/dialogs-reducer";
import AddMessageForm, {FormDataType} from "./DialogsMessage/AddMessageForm";

export type DialogsType = {
    addDialog: (value: string) => void
    dialogsPage: DialogsPageType
}

const Dialogs = (props: DialogsType) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(dialog =>
        <DialogsItem key={dialog.name} name={dialog.name}
                     id={dialog.id}/>);

    let messagesElements = state.messages.map(message =>
        <Message key={message.message} message={message.message} id={message.id}/>)


    const addNewMessage = (values: FormDataType) => {
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

