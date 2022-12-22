import {combineReducers, createStore} from "redux";
import profileReducer, {PostStateType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer, {UsersType} from "./users-reducer";

export type StateType={
     profilePage:PostStateType
    // dialogsPage:
    // friendsData:
    usersPage: UsersType

}
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    friendsData: friendsReducer,
    usersPage: usersReducer
});
let store = createStore(reducers);


export default store;