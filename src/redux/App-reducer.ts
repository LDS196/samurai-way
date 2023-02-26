
import {getAuthUserData} from "./Auth-reducer";



const SET_INITIALIZED_SUCCESS: string = 'SET_INITIALIZED_SUCCESS';
export type AuthActionType = {
    type: string
}

export type initialAppStateType = {
    initialized: boolean
}
const initialState: initialAppStateType = {
    initialized: false
}

const AppReducer = (state: initialAppStateType = initialState, action: AuthActionType) => {
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
    type: 'SET_INITIALIZED_SUCCESS',
});


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedSuccess())
        })
}
export default AppReducer;
