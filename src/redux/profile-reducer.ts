import {profileAPI, usersAPI} from "../components/api/api";

const ADD_POST: string = 'ADD-POST';
const SET_USER_PROFILE: string = 'SET_USER_PROFILE';
const SET_STATUS: string = 'SET_STATUS:';
type PhotosType = {
    small: string
    large: string
}
type ContactsType = {
    facebook: string
    website: null,
    vk: string
    twitter: string
    instagram: string
    youtube: null,
    github: string
    mainLink: null
}
export type ProfileType = {
    aboutMe: string,
    contacts: ContactsType
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}
export type ProfilesType = Array<ProfileType>
export type PostType = {
    id: number, message: string, likesCount: number
}
type PostsType = Array<PostType>;
export type PostStateType = {
    posts: PostsType
    profile: ProfileType | null
    status: string
}
const initialState: PostStateType = {
    posts: [
        {id: 1, message: 'How are you', likesCount: 12},
        {id: 2, message: 'HI Friends', likesCount: 12},
    ],
    profile: null,
    status: ''
}
type ActionType = {
    type: string
    newText?: string
    profile?: ProfileType
    status?: string
    value?:string
}
const profileReducer = (state: PostStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.value,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
};
export const addPostActionCreator = (value:string) => ({type: ADD_POST, value});
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile});
export const setStatusAC = (status: string) => ({type: SET_STATUS, status});


export const getUserProfile = (userId: number | string) => (dispatch: (a: ActionType) => void) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    })
}
export const getStatus = (userId: number | string) => {
    return (dispatch: (a: ActionType) => void) => {
        profileAPI.getStatus(userId).then(res=>{
            dispatch(setStatusAC(res.data))
        })
    }
}
export const updateStatus = (status:string) => {
    return (dispatch: (a: ActionType) => void) => {
        profileAPI.updateStatus(status).then(res=>{
            if(res.data.resultCode===0) {
                dispatch(setStatusAC(status))
            }
        })
    }
}
export default profileReducer;