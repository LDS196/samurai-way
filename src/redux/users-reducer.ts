const FOLLOW: string = 'FOLLOW';
const UNFOLLOW: string = 'UNFOLLOW';
const SET_USERS: string = 'SET_USERS';

const initialState = {
    users: [
    //     {id: 1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: false, fullName: 'Dmitrii', status: "Boss", location: {city: "Dubai", country: "UAE",}},
    //     {id: 2, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: true, fullName: 'Vasya', status: "Boss", location: {city: "Moscow", country: "Russian",}},
    //     {id: 3, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: false, fullName: 'Nika', status: "Boss", location: {city: "Ukraine", country: "Ukraine",}},
    //     {id: 4, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: false, fullName: 'Peter', status: "Boss", location: {city: "Abu Dhabi", country: "UAE",}},
     ],
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
            return {...state, users: [...state.users, ...action.users]}

        default:
            return state;
    }

};
export const followAC = (userId: number) => ({type: FOLLOW, userId});
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users: any) => ({type: SET_USERS, users});

export default usersReducer;