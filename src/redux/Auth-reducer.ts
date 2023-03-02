import {authAPI, securityAPI} from "../components/api/api";
import {stopSubmit} from "redux-form";


const SET_USERS_DATA: string = "auth-reducer/SET_USERS_DATA";
const GET_CAPTCHA_DATA: string = "auth-reducer/GET_CAPTCHA_DATA";
export type AuthActionType = {
    type: string
    payload?: DataType
    captchaUrl?:null
}
export type DataType = {
    id: number | null
    email: string | null
    login: string | null
}
export type AuthUserType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl:string | null
}
const initialState: AuthUserType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null,
}

const AuthReducer = (state: AuthUserType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_DATA:
            return {
                ...state,
                captchaUrl:action.payload
            }
        default:
            return state;
    }
};
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USERS_DATA,
    payload: {id, email, login, isAuth}
});
export const getCaptchaAC = (captchaUrl:any) => ({
    type: GET_CAPTCHA_DATA,
    payload: captchaUrl
});

export const getAuthUserData = () => async (dispatch: (a: AuthActionType) => void) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }

}
export const login = (email: string, password: string, rememberMe: boolean,captcha:string) => async(dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe,captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if(response.data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
            dispatch(stopSubmit('login', {_error: message}))
        }
}
export const logout = () => async (dispatch: (a: AuthActionType) => void) => {
    const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}

export const getCaptchaUrl = () => async (dispatch: (a: AuthActionType) => void) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
     dispatch(getCaptchaAC(captchaUrl))

}
export default AuthReducer;
