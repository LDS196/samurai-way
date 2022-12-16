import React from 'react';
import s from './MyPosts.module.css'
import Post from "../Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/profile-reducer";


function MyPosts(props: any) {
    let postsElements = props.posts.map((post: {id:number; message: string; likesCount: number; }) => <Post key={post.id} message={post.message} likeCount={post.likesCount}/>)

    let newPostElement: any = React.createRef();

    let onAddPost: any = () => {
        props.addPost()
        //props.dispatch(addPostActionCreator());
    };

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
        //props.updateNewPostTextActionCreator(text)
        //let action = updateNewPostTextActionCreator(text)
        //props.dispatch(action);
    };

    return (
        <div className={s.wrapper}>
            <h3>My Post</h3>
            <div className="">
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add Post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;