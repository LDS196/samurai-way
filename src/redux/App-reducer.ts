
import {getAuthUserData} from "./Auth-reducer";
import {Dispatch} from "redux";


const SET_INITIALIZED_SUCCESS = 'App-reducer/SET_INITIALIZED_SUCCESS';
export type AppAT = ReturnType<typeof setInitializedSuccess>


const initialState = {
    initialized: false
}
export type initialAppStateType = typeof initialState

const AppReducer = (state: initialAppStateType = initialState, action: AppAT):initialAppStateType => {
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


export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedSuccess())
        })
}
export default AppReducer;
