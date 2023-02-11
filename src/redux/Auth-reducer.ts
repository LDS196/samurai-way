import {authAPI} from "../components/api/api";


const SET_USERS_DATA: string = "SET_USERS_DATA";
export type AuthActionType = {
    type: string
    payload?: DataType
}
export type DataType = {
    id: number|null
    email: string| null
    login: string|null
}
export type AuthUserType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
const initialState: AuthUserType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const AuthReducer = (state: AuthUserType = initialState, action: AuthActionType) => {
    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state;
    }
};
export const setAuthUserData = (id: number | null, email: string|null, login: string|null,isAuth:boolean) => ({
    type: SET_USERS_DATA,
    payload: {id, email, login,isAuth}
});


export const getAuthUserData = () => (dispatch: (a:AuthActionType) => void) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, email, login,true))
        }
    })
}
export const login = (email:string,password:string,rememberMe:boolean) => (dispatch:any) => {
    authAPI.login(email,password,rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())

        }
    })
}
export const logout = () => (dispatch: (a:AuthActionType) => void) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null,false))
        }
    })
}
export default AuthReducer;
