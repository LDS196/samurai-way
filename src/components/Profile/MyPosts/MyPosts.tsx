import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts() {
    return (
        <div>
            My Post
            <div className="">
                <textarea></textarea>
                <button>Add</button>
            </div>
            <div className={s.posts}>
                <Post message={'How are you'} likeCount={5}/>
                <Post message={"What's your name"} likeCount={7} />

            </div>
        </div>
    )
}

export default MyPosts;