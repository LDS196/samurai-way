const FOLLOW: string = 'FOLLOW';
const UNFOLLOW: string = 'UNFOLLOW';
const SET_USERS: string = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2
}

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u:any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u:any) => {
                    if (u.id === action.userId) {
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
            return {...state, totalUsersCount: action.count}

        default:
            return state;
    }

};
export const followAC = (userId: number) => ({type: FOLLOW, userId});
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users: any) => ({type: SET_USERS, users});
export const setCurrentPageAC = (currentPage:number) => ({type: SET_CURRENT_PAGE,currentPage});
export const setTotalUsersCountAC = (totalCount:number) => ({type: SET_TOTAL_USERS_COUNT, count:totalCount});

export default usersReducer;
