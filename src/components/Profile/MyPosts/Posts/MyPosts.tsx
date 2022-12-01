import React from 'react';
import s from './MyPosts.module.css'
import Post from "../Post/Post";

function MyPosts(props: any) {
    let postsElements = props.posts.map((post: { message: string; likesCount: number; }) => <Post message={post.message} likeCount={post.likesCount}/>)


    let newPostElement: any = React.createRef();

    let addPost: any = () => {
        props.addPost()

    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text);
    }

    return (
        <div className={s.wrapper}>
            <h3>My Post</h3>
            <div className="">
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;