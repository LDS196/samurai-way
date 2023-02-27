import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {PostStateType} from "./profile-reducer";
import dialogsReducer, {DialogsPageType} from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer, {UsersType} from "./users-reducer";
import AuthReducer, {AuthUserType} from "./Auth-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import AppReducer, {initialAppStateType} from "./App-reducer";

 export type StateType = {
    profilePage: PostStateType
    dialogsPage: DialogsPageType
    usersPage: UsersType
    auth: AuthUserType
    app: initialAppStateType

}
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsData: friendsReducer,
    usersPage: usersReducer,
    auth: AuthReducer,
    form: formReducer,
    app: AppReducer
});
 let store = createStore(reducers,  composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;