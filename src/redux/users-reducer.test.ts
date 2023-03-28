import usersReducer, {followSuccess, InitialUsersStateType, unfollowSuccess} from "./users-reducer";

let state: InitialUsersStateType
beforeEach(()=>{
    state= {
        users: [
            {
                id: 0, name: 'Dima', followed: false, status: 'status 0',
                photos: {small: null, large: null},
                uniqueUrlName: null
            },
            {
                id: 1, name: 'Dima1', followed: false, status: 'status 1',
                photos: {small: null, large: null},
                uniqueUrlName: null
            },
            {
                id: 2, name: 'Dima2', followed: true, status: 'status 2',
                photos: {small: null, large: null},
                uniqueUrlName: null
            },
            {
                id: 3, name: 'Dima3', followed: true, status: 'status 3',
                photos: {small: null, large: null},
                uniqueUrlName: null
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
})
test('follow success', () => {

    const newState = usersReducer(state, followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBe(true)
})
test('unfollow success', () => {

    const newState = usersReducer(state, unfollowSuccess(3))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeFalsy()
})
