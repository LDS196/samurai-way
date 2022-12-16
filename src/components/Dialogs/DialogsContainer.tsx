import React from 'react';
import {addDialogCreator, updateNewDialogTextCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


// const DialogsContainer = (props: any) => {
//     let state = props.store.getState().dialogsPage
//
//     let addDialog: any = () => {
//         props.store.dispatch(addDialogCreator())
//
//     }
//     let onDialogChange = (text: string) => {
//         props.store.dispatch(updateNewDialogTextCreator(text))
//     }
//
//     return <Dialogs addDialog={addDialog}
//                     updateNewMassageText={onDialogChange}
//                     dialogPage={state}/>
// }

let mapStateToProps = (state: any) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch:any) => {
    return {
        updateNewMassageText: (text: string) => {
            dispatch(updateNewDialogTextCreator(text))
        },
        addDialog: () => {
            dispatch(addDialogCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;