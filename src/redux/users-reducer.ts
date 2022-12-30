import { usersAPI} from "../components/api/api";

const FOLLOW: string = 'FOLLOW';
const UNFOLLOW: string = 'UNFOLLOW';
const SET_USERS: string = 'SET_USERS';
const SET_CURRENT_PAGE: string = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT: string = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING: string = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
type PhotosType = {
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
    id: number
    users: Array<UserType>
    currentPage: number
    count: number
    isFetching: boolean
    followingInProgress: []
}
const initialState: UsersType = {
    users: [],
    pageSize: 5,
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
                users: state.users.map((u: UserType) => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u: UserType) => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u;
                }),
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
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.id]
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

export const getUsers = (currentPage:number,pageSize:number) => {
    return (dispatch:any) => {
        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(setCurrentPage(currentPage))
        })
    }
}
export const follow = (id:number) => {
    return (dispatch:any) => {
        dispatch(toggleIsFollowingProgress(true, id))
        usersAPI.followUser(id).then(data => {
            if (data.resultCode == 0) {
               dispatch(followSuccess(id))
            }
           dispatch(toggleIsFollowingProgress(false, id))
        })
    }
}
export const unfollow = (id:number) => {
    return (dispatch:any) => {
        dispatch(toggleIsFollowingProgress(true, id))
        usersAPI.unfollowUser(id).then(data => {
            if (data.resultCode == 0) {
                dispatch(unfollowSuccess(id))
            }
            dispatch(toggleIsFollowingProgress(false, id))
        })
    }
}
export default usersReducer;
