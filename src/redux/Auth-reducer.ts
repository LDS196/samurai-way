import {stopSubmit} from "redux-form";
import {securityAPI} from "components/api/securityAPI";
import {authAPI} from "components/api/authAPI";
import {ResultCode} from "types/types";
import {CommonThunkType} from "./redux-store";

const SET_USERS_DATA: string = "auth-reducer/SET_USERS_DATA";
const GET_CAPTCHA_DATA: string = "auth-reducer/GET_CAPTCHA_DATA";
type ThunkType = CommonThunkType<AuthAC | ReturnType<typeof stopSubmit>>
type SetAuthUserDataAC =ReturnType<typeof setAuthUserData>
type GetCaptchaAC =ReturnType<typeof getCaptchaAC>
type AuthAC = SetAuthUserDataAC| GetCaptchaAC

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl:null as string | null,
}
export type AuthUserType = typeof initialState

const AuthReducer = (state = initialState, action: AuthAC):AuthUserType => {
    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USERS_DATA,
    payload: {id, email, login, isAuth}
} as const);
export const getCaptchaAC = (captchaUrl:string|null) => ({
    type: GET_CAPTCHA_DATA,
    payload: {captchaUrl}
}as const);

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    const data = await authAPI.me()
    if (data.resultCode === ResultCode.Success ) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string,
                      rememberMe: boolean,captcha:string):ThunkType => async(dispatch) => {
    const data = await authAPI.login(email, password, rememberMe,captcha)
        if (data.resultCode === ResultCode.Success) {
            dispatch(getAuthUserData())
        } else {
            if(data.resultCode === ResultCode.Captcha){
                dispatch(getCaptchaUrl())
            }
            const message = data.messages.length > 0 ? data.messages[0] : 'Some Error'
            dispatch(stopSubmit('login', {_error: message}))
        }
}
export const logout = ():ThunkType => async (dispatch) => {

    const data = await authAPI.logout()
        if (data.resultCode === ResultCode.Success) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
     dispatch(getCaptchaAC(captchaUrl))

}
export default AuthReducer;
