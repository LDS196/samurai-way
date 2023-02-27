import {usersAPI} from "../components/api/api";

const FOLLOW: string = 'users-reducer/FOLLOW';
const UNFOLLOW: string = 'users-reducer/UNFOLLOW';
const SET_USERS: string = 'users-reducer/SET_USERS';
const SET_CURRENT_PAGE: string = 'users-reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT: string = "users-reducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING: string = 'users-reducer/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS: string = 'users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS'

export type PhotosType = {
    small: null
    large: null
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: PhotosType
    status: null
    followed: boolean
}
export type UsersType = {  //for state
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: []
}
export type ActionType = {
    type: string
    id?: number
    users?: Array<UserType>
    currentPage?: number
    count?: number
    isFetching?: boolean
    followingInProgress?: []
}
const initialState: UsersType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state: UsersType = initialState, action: ActionType) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u: UserType) => u.id === action.id ? {...u, followed: true} : u),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u: UserType) => u.id === action.id ? {...u, followed: false} : u),
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
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

export const followSuccess = (id: number) => ({type: FOLLOW, id});
export const unfollowSuccess = (id: number) => ({type: UNFOLLOW, id});
export const setUsers = (users: UserType[]) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalCount});
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowingProgress = (isFetching: boolean, id: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    id
});

export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: (a: ActionType) => void) => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(currentPage))
    }
}

const followUnFollowFlow = async (dispatch: any, id: any, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, id))
    const data = await apiMethod(id)
    if (data.resultCode == 0) dispatch(actionCreator(id))
    dispatch(toggleIsFollowingProgress(false, id))

}

export const follow = (id: number) => {
    return async (dispatch: (a: ActionType) => void) => {
        dispatch(toggleIsFollowingProgress(true, id))
        const data = await usersAPI.followUser(id)
        if (data.resultCode == 0) dispatch(followSuccess(id))
        dispatch(toggleIsFollowingProgress(false, id))

    }
}
export const unfollow = (id: number) => {
    return async (dispatch: any) => {
      followUnFollowFlow(dispatch, id, usersAPI.unfollowUser.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;
