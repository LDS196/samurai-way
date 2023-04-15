import React, {memo} from 'react';
import s from './MyPosts.module.css'
import Post from "../Post/Post";
import {addPostActionCreator,} from "redux/profile-reducer";
import AddPostForm, {FormDataType} from "../AddPostForm/AddPostForm";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "redux/redux-store";


const MyPosts = memo(() => {
    const posts = useSelector((state: StateType) => state.profilePage.posts)
    const dispatch = useDispatch()

    let postsElements = posts.map((post: { id: number; message: string; likesCount: number; }) => <Post
        key={post.id} message={post.message} likeCount={post.likesCount}/>)

    let onAddPost = (values: FormDataType) => {
        dispatch(addPostActionCreator(values.newPost))
    };

    return (
        <div className={s.wrapper}>
            <h3>My Post</h3>
            <div className="">
                <AddPostForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;

