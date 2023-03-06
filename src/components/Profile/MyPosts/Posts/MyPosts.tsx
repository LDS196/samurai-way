import React, {memo} from 'react';
import s from './MyPosts.module.css'
import Post from "../Post/Post";
import {PostType} from "../../../../redux/profile-reducer";
import AddPostForm, {FormDataType} from "../AddPostForm/AddPostForm";




type MyPostsType={
    posts: Array<PostType>
    addPost:(value:string)=>void

}


const MyPosts = memo((props: MyPostsType) => {

    let postsElements = props.posts.map((post: { id: number; message: string; likesCount: number; }) => <Post
        key={post.id} message={post.message} likeCount={post.likesCount}/>)

    let onAddPost = (values:FormDataType) => {
        props.addPost(values.newPost)
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

