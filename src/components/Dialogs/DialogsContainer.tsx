import React from 'react';
import {
    ActionDialogsType,
    addDialogCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

import {StateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogsPage,

    }
}
let mapDispatchToProps = (dispatch: (a: ActionDialogsType) => void) => {
    return {
        addDialog: (newMessageBody:string) => {
            dispatch(addDialogCreator(newMessageBody))
        }
    }
}
compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

// let AuthRedirectComponent = WithAuthRedirect(Dialogs)
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default compose<React.FC>(connect(mapStateToProps, mapDispatchToProps), WithAuthRedirect)(Dialogs)