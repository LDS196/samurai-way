import {profileAPI, usersAPI} from "../components/api/api";
import {stopSubmit} from "redux-form";

const DELETE_POST = "profile-reducer/DELETE_POST"
const ADD_POST: string = 'profile-reducer/ADD-POST';
const SET_USER_PROFILE: string = 'profile-reducer/SET_USER_PROFILE';
const SET_STATUS: string = 'profile-reducer/SET_STATUS:';
const SAVE_PHOTO: string = 'profile-reducer/SAVE_PHOTO:';
type PhotosType = {
    small: string
    large: string
}
type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type ContactsKey = keyof ContactsType

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

export type PostStateType = {
    posts: Array<PostType>;
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
    value?: string
    id?: number
    photos?: any
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
        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.id)
            }
        }
        case SAVE_PHOTO: {

            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
};
export const addPostActionCreator = (value: string) => ({type: ADD_POST, value});
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile});
export const setStatusAC = (status: string) => ({type: SET_STATUS, status});
export const deletePostActionCreator = (id: number) => ({type: DELETE_POST, id})
export const savePhotoSuccess = (photos: any) => ({type: SAVE_PHOTO, photos})

export const getUserProfile = (userId: number | string) => async (dispatch: (a: ActionType) => void) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: number | string) => {
    return async (dispatch: (a: ActionType) => void) => {
        const res = await profileAPI.getStatus(userId)

        dispatch(setStatusAC(res.data))
    }
}
export const updateStatus = (status: string) => async (dispatch: (a: ActionType) => void) => {
    try {
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch(error) {

    }

}
export const savePhoto = (file: any) => {
    return async (dispatch: (a: ActionType) => void) => {
        const res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos))
        }
    }
}
export const saveProfile = (formData: any) => async (dispatch: any, getSate: any) => {
    const userId = getSate().auth.id
    const response = await profileAPI.saveProfile(formData)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let name = response.data.messages[0].split('>')[1].toLowerCase()
        name = name.substr(0, (name.length - 1))
        dispatch(stopSubmit('edit-profile', {'contacts': {[name]: response.data.messages[0]}}))
        return Promise.reject(response.data.messages[0])
    }
}
export default profileReducer;