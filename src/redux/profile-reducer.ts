import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {CommonThunkType, StateType} from "./redux-store";
import {usersAPI} from "../components/api/usersAPI";
import {PhotosType, profileAPI, ProfileType} from "../components/api/profileAPI";
import {ResultCode} from "../types/types";

const DELETE_POST = "profile-reducer/DELETE_POST"
const ADD_POST = 'profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile-reducer/SET_STATUS:';
const SAVE_PHOTO = 'profile-reducer/SAVE_PHOTO:';

type ThunkType = CommonThunkType<ProfileAT | ReturnType<typeof stopSubmit>>

export type AddPostAT = ReturnType<typeof addPostActionCreator>
export type SetUserProfileAT = ReturnType<typeof setUserProfile>
export type SetStatusAT = ReturnType<typeof setStatusAC>
export type DeletePostAT = ReturnType<typeof deletePostActionCreator>
export type SavePhotoSuccessAT = ReturnType<typeof savePhotoSuccess>

type ProfileAT = AddPostAT | SetUserProfileAT | SetStatusAT | DeletePostAT | SavePhotoSuccessAT
export type PostType = {
    id: number, message: string, likesCount: number
}

const initialProfileState = {
    posts: [
        {id: 1, message: 'How are you!', likesCount: 12},
        {id: 2, message: 'HI Friends!', likesCount: 5},
    ] as Array<PostType>,
    profile: null as null | ProfileType,
    status: '',
    newPostText: ''
}
export type ProfileStateType = typeof initialProfileState

const profileReducer = (state = initialProfileState, action: ProfileAT): ProfileStateType => {
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
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (value: string) => ({type: ADD_POST, value} as const);
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const);
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const);
export const deletePostActionCreator = (id: number) => ({type: DELETE_POST, id} as const)
export const savePhotoSuccess = (photos: PhotosType) => ({type: SAVE_PHOTO, photos} as const)

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(data))
    }
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCode.Success) {
            dispatch(setStatusAC(status))
        }
    } catch (error) {
    }
}
export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.savePhoto(file)
        if (data.resultCode === ResultCode.Success) {
            dispatch(savePhotoSuccess(data.data.photos))
        }
    }
}


export const saveProfile = (formData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(formData)
    if (data.resultCode === ResultCode.Success) {
        if (userId != null) {
            await dispatch(getUserProfile(userId))
        } else {
            throw new Error('Error')
        }
    } else {
        let name = data.messages[0].split('>')[1].toLowerCase()
        name = name.substr(0, (name.length - 1))
        dispatch(stopSubmit('edit-profile', {'contacts': {[name]: data.messages[0]}}))
        return Promise.reject(data.messages[0])
    }
}
export default profileReducer;