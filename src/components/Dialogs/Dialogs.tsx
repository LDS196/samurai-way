import React from 'react';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./DialogsMessage/Message";
import {addDialogCreator, updateNewDialogTextCreator} from "../../redux/dialogs-reducer";


const Dialogs = (props: any) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map((dialog: { name: string; id: number; }) => <DialogsItem key={dialog.id} name={dialog.name}
                                                                                              id={dialog.id}/>);
    let messagesElements = state.messages.map((message: { message: string; id: number; }) => <Message key={message.id}
        message={message.message}/>)

    let newDialogElement = state.newDialogText

    let addDialog: any = () => {
        props.addDialog()
    }
    let onDialogChange = (e: any) => {
        let text: string = e.target.value
        props.updateNewMassageText(text)

    }

    return (<div>
            <div className={s.dialogs}>
                <div className={s.dialogs__items}>
                    {dialogsElements}
                </div>
                <div className={s.dialogs__messages}>
                    {messagesElements}
                </div>
            </div>
            <textarea
                onChange={onDialogChange}
                value={newDialogElement}
                placeholder='Enter your message'
            >

            </textarea>
            <button onClick={addDialog}>Add Dialog</button>
        </div>


    )
}

export default Dialogs;