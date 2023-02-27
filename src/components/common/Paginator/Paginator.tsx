import React, {useEffect, useState} from 'react';
import style from "../Paginator/Paginator.module.css";


type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize:number
}
const Paginator:React.FC<PaginatorPropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged,portionSize}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(totalItemsCount/portionSize)
    const [portion,setPortion]=useState(1)
    useEffect(()=>setPortion(Math.ceil(currentPage/portionSize)), [currentPage]);
    const leftBorder = (portion -1) * portionSize + 1
    const rightBorder =  portionSize * portion
    return (
        <div>
            {portion>1 && <span><button onClick={()=> setPortion(portion-1)}>Prev</button></span>}

            {pages
                .filter(p=>p >= leftBorder && p <= rightBorder)
                .map(p => <span key={p}
                                className={currentPage === p ? style.selectedPage : ''}
                                onClick={() => onPageChanged(p)}>{p}</span>)}
            {portionCount>portion &&<span><button onClick={()=> setPortion(portion+1)}>Next</button></span>}
        </div>
    )
};

export default Paginator;