import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../api/usersAPI";
import {UsersSearchForm} from "./UsersSearchForm";
import {getUsers} from "redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageSelector, getPageSizeSelector,
    getTotalUsersCountSelector, getUsersFilterSelector, getUsersSelector
} from "redux/users-selectors";
import {useSearchParams} from "react-router-dom";


type UsersPropsType = {}
type QueryParamsType = {
    term?: string
    friend?: string
    currentPage?: string
}

const Users: React.FC<UsersPropsType> = () => {
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
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        let actualPage = currentPage
        let actualFilter = filter
        if (!!searchParams.get('page')) actualPage = Number(searchParams.get('page'))
        if (!!searchParams.get('term')) actualFilter = {...actualFilter, term: searchParams.get('term') as string}
        if (!!searchParams.get('friend')) actualFilter = {
            ...actualFilter,
            friend: (searchParams.get('friend') === 'null' ? null : searchParams.get('friend') === 'true')
        }
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.currentPage = String(currentPage)

        setSearchParams(query)
    }, [filter, currentPage])
    return (
        <div>
            <Paginator portionSize={10}/>
            <UsersSearchForm/>
            {usersForRender}
            <Paginator portionSize={10}/>
        </div>
    )
};


export default Users;