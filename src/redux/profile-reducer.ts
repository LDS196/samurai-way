

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState = {
    posts: [
        {id: 1, message: 'How are you', likesCount: 12},
        {id: 2, message: 'HI Friends', likesCount: 12},
    ],
    newPostText: 'new post',
}

const profileReducer = (state= initialState, action:any) =>{
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return{
                ...state,
                posts: [...state.posts,newPost],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return{
                ...state,
                newPostText: action.newText
            }
        default:return state;
    }

};
export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;