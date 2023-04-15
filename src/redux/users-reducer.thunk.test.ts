import {follow, followSuccess, toggleIsFollowingProgress, unfollow, unfollowSuccess} from "./users-reducer";
import {usersAPI} from "../components/api/usersAPI";
import {ResponseType, ResultCode} from "../types/types";

jest.mock('../components/api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.followUser.mockClear()
    usersAPIMock.unfollowUser.mockClear()
})
const result: ResponseType = {
    data: {},
    fieldsErrors: [],
    messages: [],
    resultCode: ResultCode.Success
}


test('success follow thunk ', async () => {
    usersAPIMock.followUser.mockResolvedValue(result)
    const thunk = follow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(followSuccess(1))
    expect(dispatchMock).toHaveBeenCalledWith(toggleIsFollowingProgress(false, 1))
})
test('success unfollow thunk ', async () => {
    usersAPIMock.unfollowUser.mockResolvedValue(result)
    const thunk = unfollow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenCalledWith(toggleIsFollowingProgress(false, 1))
})