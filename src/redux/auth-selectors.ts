import {StateType} from "./redux-store";

 export const selectIsAuth =(state:StateType)=>{
    return state.auth.isAuth
}
export const selectLogin =(state:StateType)=>{
    return state.auth.login
}

