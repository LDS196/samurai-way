const ADD_POST:string = 'ADD-POST';
const UPDATE_NEW_POST_TEXT:string = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE:string = 'SET_USER_PROFILE';
type PostType={
    id: number, message: string, likesCount: number
}
type PostsType = Array<PostType>;
type PostStateType={
    posts:PostsType
    newPostText: string
    profile: null
}
const initialState:PostStateType = {
    posts: [
        {id: 1, message: 'How are you', likesCount: 12},
        {id: 2, message: 'HI Friends', likesCount: 12},
    ],
    newPostText: 'new post',
     profile: null
}
type ActionType={
    type:string
    newText:string
    profile:any
}
const profileReducer = (state:PostStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:{
            return {...state, profile:action.profile}
        }
        default:
            return state;
    }
};
export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile});
export default profileReducer;