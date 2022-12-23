const SET_USERS_DATA: string = "SET_USERS_DATA";
export type AuthActionType = {
    type: string
    data: DataType
}
export type DataType={
    id:number
    email:string
    login:string
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
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
};
export const setAuthUserData = (id: number, email: string, login: string,) => ({
    type: SET_USERS_DATA,
    data: {id, email, login}
});

export default AuthReducer;
