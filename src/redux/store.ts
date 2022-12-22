import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";


type PostMessageType = {
    id: number,
    message: string,
    likesCount: number
};
type DialogMessageType = {
    id: number,
    message: string,
};
type DialogUserType = {
    id: number,
    name: string,
};

export type ProfilePageType = {
    posts: Array<PostMessageType>,
    newPostText: string
}

export type DialogsPageType = {
    messages: Array<DialogMessageType>,
    dialogs: Array<DialogUserType>,
    newDialogText: string,
};
type NameFriendType = {
    id: number,
    name: string
};

type FriendsData = {
    names: Array<NameFriendType>;
};
export type StateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType,
    friendsData: FriendsData
};
export type StoreType = {
    _state: StateType,
    _callSubscriber: () => any,
    getState: () => StateType,
    subscribe: () => void,
    dispatch: () => void,
    dispatchDialog: () => void,
};
export type ActionType = {
    type: any,
    newText: any
    text: any
}

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
            newDialogText: ''
        },
        friendsData: {
            names: [
                {id: 1, name: 'Andrew'},
                {id: 2, name: 'Vano'},
                {id: 3, name: 'Tony'}
            ]
        },
    },
    _callSubscriber(a:any) {
        console.log('dd')
    },
    getState(): StateType {
        return this._state
    },
    subscribe(observer: (state: any ) => void) {
        this._callSubscriber = observer;
    },
    dispatch(action: ActionType) {
         // this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.friendsData = friendsReducer(this._state.friendsData, action);
        this._callSubscriber(this._state);

    }
}


export default store;

