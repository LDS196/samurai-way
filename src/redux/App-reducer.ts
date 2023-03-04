
import {getAuthUserData} from "./Auth-reducer";

const SET_INITIALIZED_SUCCESS = 'Auth-reducer/SET_INITIALIZED_SUCCESS';
export type AuthAC = ReturnType<typeof setInitializedSuccess>

export type initialAppStateType = {
    initialized: boolean
}
const initialState: initialAppStateType = {
    initialized: false
}

const AppReducer = (state: initialAppStateType = initialState, action: AuthAC):initialAppStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};
export const setInitializedSuccess = () => ({
    type: SET_INITIALIZED_SUCCESS,
} as const);


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedSuccess())
        })
}
export default AppReducer;
