import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";

import AuthReducer from "./Auth-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import AppReducer from "./App-reducer";

export type StateType = ReturnType<typeof reducers>

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

export type CommonThunkType<A extends Action, R =Promise<void>> = ThunkAction<R, StateType, unknown, A>

export default store;