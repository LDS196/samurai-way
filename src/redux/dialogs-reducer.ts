
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

};
export type ActionDialogsType = {
    type: string
    text?: string
    newMessageBody?:string
    id?:number
}
const initialState: DialogsPageType = {
    messages: [
        {id: 1, message: 'How are you',},
        {id: 2, message: 'HI Friends',},
        {id: 3, message: 'Yo Yo!',},
        {id: 4, message: 'How are you',},
        {id: 5, message: 'How are you',},

    ],
    dialogs: [
        {id: 1, name: 'Viktor',},
        {id: 2, name: 'User',},
        {id: 3, name: 'Vasya',},
        {id: 4, name: 'Katya',},
        {id: 5, name: 'Olga',},
        {id: 6, name: 'Sveta',},

    ],

};

const dialogsReducer = (state = initialState, action: ActionDialogsType) => {
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
export const addDialogCreator = (newMessageBody:string) => ({type: ADD_DIALOG,newMessageBody});


export default dialogsReducer;