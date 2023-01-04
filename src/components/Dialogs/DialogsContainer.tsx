import React from 'react';
import {addDialogCreator, updateNewDialogTextCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


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
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
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
let AuthRedirectComponent = (props:any)=>{
    if (!props.isAuth) return <Redirect to={'/login'}/>
    return <Dialogs {...props}/>
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;