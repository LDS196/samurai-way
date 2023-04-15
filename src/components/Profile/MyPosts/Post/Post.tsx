import React from 'react';
import s from './Post.module.css'
import {useSelector} from "react-redux";
import {StateType} from "redux/redux-store";

type MessagePropsType = {
    message: string,
    likeCount: number,
}

function Post(props: MessagePropsType) {
    const photo = useSelector((state: StateType) => state.profilePage.profile?.photos.small)
    const login = useSelector((state: StateType) => state.auth.login)
    return (
        <div className={s.item}>
            <figure style={{margin:'0'}}>
                <img src={photo?photo:undefined} alt="avatar"/>
                <figcaption>{login}</figcaption>
            </figure>
            <span>{props.message}</span>
        </div>
    )
}

export default Post;