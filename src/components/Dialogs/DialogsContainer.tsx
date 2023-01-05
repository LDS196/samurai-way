import React from 'react';
import {
    ActionDialogsType,
    addDialogCreator,
    updateNewDialogTextCreator
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

import {StateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


let mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogsPage,

    }
}
let mapDispatchToProps = (dispatch:(a:ActionDialogsType)=>void) => {
    return {
        updateNewMassageText: (text: string) => {
            dispatch(updateNewDialogTextCreator(text))
        },
        addDialog: () => {
            dispatch(addDialogCreator())
        }
    }
}

 let AuthRedirectComponent = WithAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;