import React from 'react';
import s from './MyPosts.module.css'
import Post from "../Post/Post";


function MyPosts() {
    let posts = [
        {id: 1, message: 'How are you', likesCount: 12},
        {id: 2, message: "What's your name", likesCount: 10},
    ];

    let postsElements = posts.map(post => <Post message={post.message} likeCount={post.likesCount}/> )

    return (
        <div className={s.wrapper}>
            <h3>My Post</h3>
            <div className="">
                <div><textarea></textarea></div>
                <div>
                    <button>Add</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;