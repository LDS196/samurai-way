import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../api/usersAPI";
import {UsersSearchForm} from "./UsersSearchForm";
import { getUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPageSelector, getPageSizeSelector,
    getTotalUsersCountSelector, getUsersFilterSelector, getUsersSelector
} from "../../redux/users-selectors";

type UsersPropsType = {}
const Users:React.FC<UsersPropsType> = () => {
    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCountSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const filter = useSelector(getUsersFilterSelector)
    const dispatch = useDispatch()

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const usersForRender = users.map((u: UserType) => <User key={u.id} user={u}/>)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    return (
        <div>
            <UsersSearchForm/>
            <Paginator portionSize={10}/>
            {usersForRender}
        </div>
    )
};


export default Users;