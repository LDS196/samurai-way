import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./DialogsMessage/Message";

import { DialogsPageType} from "../../redux/dialogs-reducer";

export type DialogsType = {
    updateNewMassageText: (text: string) => void
    addDialog: () => void
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

    let newDialogElement = state.newDialogText

    let addDialog = () => {
        props.addDialog()
    }
    let onDialogChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text: string = e.target.value
        props.updateNewMassageText(text)

    }
    // if (!props.isAuth) return <Redirect to={'/login'}/>

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