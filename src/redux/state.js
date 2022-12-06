
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'How are you', likesCount: 12},
                {id: 2, message: 'HI Friends', likesCount: 12},
            ],
            newPostText: 'new post',
        },
        dialogsPage: {
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
            newDialogText : 'new dialog'
        },
        friendsData: {
            names:  [
                {id: 1, name: 'Andrew'},
                {id: 2, name: 'Vano'},
                {id: 3, name: 'Tony'}
            ]
        },
    },
    _callSubscriber () {
        console.log('dd')
    },
    getState(){
        return this._state
    },
    subscribe (observer ) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        if(action.type === 'ADD-POST'){
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText ="";
            this._callSubscriber (this._state);

        } else if (action.type === 'UPDATE-NEW-POST-TEXT'){
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber (this._state);
        }
    },
    dispatchDialog(action) {
        if( action.type ==='ADD-DIALOG'){
            let dialogMessage = {
                id: 2,
                message: this._state.dialogsPage.newDialogText,
            }
            this._state.dialogsPage.messages.push(dialogMessage);
            this._state.dialogsPage.newDialogText = "";
            this._callSubscriber (this._state);
        } else if(action.type ==='UPDATE-NEW-DIALOG-TEXT' ){
            this._state.dialogsPage.newDialogText = action.text;

            this._callSubscriber (this._state);
        }
    }
}
export const addPostActionCreator = () =>({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});


window.store=store;
export default store;

// export let addDialogText = (text) => {
//     let dialogMessage = {
//         id: 2,
//         message: text,
//     }
//     store._state.dialogsPage.messages.push(dialogMessage);
//
// }
//  export let onChangeTextDialog = (text) => {
//     store._state.dialogsPage.newDialogText = text;
// }