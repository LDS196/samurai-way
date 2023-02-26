import {StateType} from "./redux-store";
import {createSelector} from "reselect";

 const getUsers=(state:StateType)=>{
    return state.usersPage.users
}
export const getUsersSelector= createSelector(getUsers,(users)=>{
    return users.filter(u=> true)
})
export const getPageSizeSelector=(state:StateType)=>{
    return state.usersPage.pageSize
}
export const getTotalUsersCountSelector=(state:StateType)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPageSelector=(state:StateType)=>{
    return state.usersPage.currentPage
}
export const getIsFetchingSelector=(state:StateType)=>{
    return state.usersPage.isFetching
}
export const getFollowingInProgressSelector=(state:StateType)=>{
    return state.usersPage.followingInProgress
}