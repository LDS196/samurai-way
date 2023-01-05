const UPDATE_NEW_DIALOG_TEXT = 'UPDATE-NEW-DIALOG-TEXT';
const ADD_DIALOG = 'ADD-DIALOG';
export type DialogMessageType = {
    id: number
    message: string
};
export type DialogUserType = {
    id: number
    name: string
};
export type DialogsPageType = {
    messages: Array<DialogMessageType>,
    dialogs: Array<DialogUserType>,
    newDialogText: string,
};
export type ActionDialogsType = {
    type: string
    text?: string
}
const initialState: DialogsPageType = {
    messages: [
        {id: 1, message: 'How are you',},
        {id: 2, message: 'HI Friends',},
        {id: 3, message: 'Yo Yo!',},
        {id: 4, message: 'How are you',},
        {id: 5, message: 'How are you',},
        {id: 6, message: 'How are you',}
    ],
    dialogs: [
        {id: 1, name: 'Viktor',},
        {id: 2, name: 'User',},
        {id: 3, name: 'Vasya',},
        {id: 4, name: 'Katya',},
        {id: 5, name: 'Olga',},
        {id: 6, name: 'Sveta',}
    ],
    newDialogText: ''
};

const dialogsReducer = (state = initialState, action: ActionDialogsType) => {
    switch (action.type) {
        case UPDATE_NEW_DIALOG_TEXT:
            return {
                ...state,
                newDialogText: action.text
            }
        case ADD_DIALOG:
            let dialogMessage = {
                id: 7,
                message: state.newDialogText,
            }
            return {
                ...state,
                messages: [...state.messages, dialogMessage],
                newDialogText: ''
            }

        default:
            return state;
    }
};
export const addDialogCreator = () => ({type: ADD_DIALOG});
export const updateNewDialogTextCreator = (text: string) =>
    ({type: UPDATE_NEW_DIALOG_TEXT, text: text});

export default dialogsReducer;