
const ADD_DIALOG = 'ADD-DIALOG';
export type DialogMessageType = {
    id: number
    message: string
};
export type DialogUserType = {
    id: number
    name: string
};

type AddDialogCreatorAT = ReturnType<typeof addDialogCreator>
export type ActionDialogsType = AddDialogCreatorAT

const initialState = {
    messages: [
        {id: 1, message: 'How are you!',},
        {id: 2, message: 'Hi Friends!',},
        {id: 3, message: 'Yo Yo!',},
        {id: 4, message: 'Some text',},
        {id: 5, message: 'Hello everyone!',},

    ] as Array<DialogMessageType>,
    dialogs: [
        {id: 1, name: 'Viktor',},
        {id: 2, name: 'User',},
        {id: 3, name: 'Vasya',},
        {id: 4, name: 'Katya',},
        {id: 5, name: 'Olga',},
        {id: 6, name: 'Sveta',},

    ] as Array<DialogUserType>,

};
export type DialogsPageType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionDialogsType):DialogsPageType => {
    switch (action.type) {
        case ADD_DIALOG:
            let dialogMessage = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id:6, message:dialogMessage}],
            }
        default:
            return state;
    }
};
export const addDialogCreator = (newMessageBody:string) => ({type: ADD_DIALOG,newMessageBody} as const);


export default dialogsReducer;