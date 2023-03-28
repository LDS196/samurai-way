import React, {memo, useEffect, useState} from 'react';
import s from "../Paginator/Paginator.module.css";

import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPageSelector, getPageSizeSelector, getTotalUsersCountSelector,
    getUsersFilterSelector
} from "../../../redux/users-selectors";
import {getUsers} from "../../../redux/users-reducer";

type PaginatorPropsType = {
    portionSize: number
}
const Paginator: React.FC<PaginatorPropsType> = memo(({portionSize}) => {

    const totalItemsCount = useSelector(getTotalUsersCountSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const filter = useSelector(getUsersFilterSelector)

    const dispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(totalItemsCount / portionSize)
    const [portion, setPortion] = useState(1)

    useEffect(() => setPortion(Math.ceil(currentPage / portionSize)), [currentPage]);

    const leftBorder = (portion - 1) * portionSize + 1
    const rightBorder = portionSize * portion
    return (
        <div>
            {portion > 1 && <span><button onClick={() => setPortion(portion - 1)}>Prev</button></span>}

            {pages
                .filter(p => p >= leftBorder && p <= rightBorder)
                .map(p => <span key={p}
                     className={currentPage === p ? s.selectedPage : ''}
                                onClick={() => onPageChanged(p)}>{p}</span>)}
            {portionCount > portion && <span><button onClick={() => setPortion(portion + 1)}>Next</button></span>}
        </div>
    )
});

export default Paginator;