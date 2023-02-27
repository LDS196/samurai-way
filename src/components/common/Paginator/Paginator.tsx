import React from 'react';
import style from "../Paginator/Paginator.module.css";


type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
const Paginator:React.FC<PaginatorPropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(p => <span key={p} className={currentPage === p ? style.selectedPage : ''}
                                  onClick={() => {
                                     onPageChanged(p)
                                  }}>{p}</span>)}
        </div>
    )
};

export default Paginator;