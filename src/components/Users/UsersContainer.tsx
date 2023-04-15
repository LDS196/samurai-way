import React, {memo} from 'react';
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetchingSelector,} from "../../redux/users-selectors";
import Users from "./Users";

type UsersPagePropsType = {}

export const UsersPage: React.FC<UsersPagePropsType> = memo(() => {
    const isFetching = useSelector(getIsFetchingSelector)

    return (<>
            <h2>Users</h2>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
})
