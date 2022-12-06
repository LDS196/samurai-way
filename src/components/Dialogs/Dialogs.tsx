import React from 'react';

import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./DialogsMessage/Message";



const Dialogs = (props:any) => {

    let dialogsElements = props.state.dialogs.map( (dialog: { name: any; id: any; }) => <DialogsItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.state.messages.map( (message: { message: any; }) => <Message message={message.message}/> )

    let newDialogElement: any = React.createRef()

    let addDialog: any = () => {
        let text: any = newDialogElement.current.value;
        props.dispatchDialog({type: 'ADD-DIALOG'})

    }
    let onDialogChange = () =>{
        let text: any = newDialogElement.current.value
        props.dispatchDialog({type: 'UPDATE-NEW-DIALOG-TEXT', text})

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
            <textarea ref={newDialogElement} onChange={onDialogChange}
                      value={props.state.newDialogText}></textarea>
            <button onClick={addDialog}>Add Dialog</button>
    </div>


    )
}

export default Dialogs;