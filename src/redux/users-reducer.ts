import {ResponseType} from '../types/types'
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";
import {usersAPI, UserType} from "../components/api/usersAPI";

const FOLLOW = 'users-reducer/FOLLOW';
const UNFOLLOW = 'users-reducer/UNFOLLOW';
const SET_USERS = 'users-reducer/SET_USERS';
const SET_CURRENT_PAGE = 'users-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = "users-reducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = 'users-reducer/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_FILTER = 'users-reducer/SET_FILTER'

export type FollowAT = ReturnType<typeof followSuccess>
export type UnfollowAT = ReturnType<typeof unfollowSuccess>
export  type SetUsersAT = ReturnType<typeof setUsers>
export  type SetCurrentPageAT = ReturnType<typeof setCurrentPage>
export  type SetTotalUsersCountAT = ReturnType<typeof setTotalUsersCount>
export  type ToggleIsFetchingAT = ReturnType<typeof toggleIsFetching>
export  type ToggleIsFollowingProgressAT = ReturnType<typeof toggleIsFollowingProgress>
export  type SetFilterAT = ReturnType<typeof setFilter>

export type InitialUsersStateType = typeof initialState
export type FilterType = typeof initialState.filter
export type UsersReducerActionType = FollowAT | UnfollowAT | SetUsersAT | SetCurrentPageAT
    | SetTotalUsersCountAT | ToggleIsFetchingAT | ToggleIsFollowingProgressAT | SetFilterAT

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state: InitialUsersStateType = initialState, action: UsersReducerActionType): InitialUsersStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u),
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_FILTER:
            return {...state, filter: action.payload}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            };
        default:
            return state;
    }
};

export const followSuccess = (id: number) => ({type: FOLLOW, id} as const);
export const unfollowSuccess = (id: number) => ({type: UNFOLLOW, id} as const);
export const setUsers = (users: UserType[]) => ({type: SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const);
export const setFilter = (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const);
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalCount} as const);
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const);
export const toggleIsFollowingProgress = (isFetching: boolean, id: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, id
} as const);

type GetStateType = () => StateType
type DispatchType = Dispatch<UsersReducerActionType>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, UsersReducerActionType>

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setFilter(filter))
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(currentPage))
    }
}

const _followUnFollowFlow = async (dispatch: DispatchType, id: number,
                                   apiMethod: (id: number) => Promise<ResponseType>,
                                   actionCreator: (id: number) => FollowAT | UnfollowAT) => {
    dispatch(toggleIsFollowingProgress(true, id))
    const data = await apiMethod(id)
    if (data.resultCode == 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowingProgress(false, id))

}

export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnFollowFlow(dispatch, id, usersAPI.followUser.bind(usersAPI), followSuccess)
    }
}
export const unfollow = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnFollowFlow(dispatch, id, usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess)
    }
}
export default usersReducer;
