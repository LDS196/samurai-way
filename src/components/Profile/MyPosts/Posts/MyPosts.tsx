import React from 'react';
import s from './MyPosts.module.css'
import Post from "../Post/Post";

function MyPosts(props: any) {
    let postsElements = props.posts.map((post: { message: string; likesCount: number; }) => <Post message={post.message}
                                                                                                  likeCount={post.likesCount}/>)

    let newPostElement: any = React.createRef();

    let addPost: any = () => {
        debugger;
         let text: any = newPostElement.current.value;
            props.addPost(text)
    }
    return (
        <div className={s.wrapper}>
            <h3>My Post</h3>
            <div className="">
                <div>
                    <textarea ref={newPostElement}></textarea>
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