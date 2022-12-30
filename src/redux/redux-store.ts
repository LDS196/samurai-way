import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {PostStateType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer, {UsersType} from "./users-reducer";
import AuthReducer, {AuthUserType} from "./Auth-reducer";
import thunkMiddleware from "redux-thunk";
export type StateType={
     profilePage:PostStateType
    // dialogsPage:
    // friendsData:
    usersPage: UsersType
    auth: AuthUserType

}
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsData: friendsReducer,
    usersPage: usersReducer,
    auth: AuthReducer
});
let store = createStore(reducers,applyMiddleware(thunkMiddleware));


export default store;