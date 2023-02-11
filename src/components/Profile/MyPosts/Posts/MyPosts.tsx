import React from 'react';
import s from './MyPosts.module.css'
import Post from "../Post/Post";
import {PostType} from "../../../../redux/profile-reducer";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {TextArea} from "../../../common/FormControls/FormsControls";

const maxLength10=maxLengthCreator(10)
type MyPostsType={
    posts: Array<PostType>
    addPost:(value:string)=>void

}
function MyPosts(props: MyPostsType) {
    let postsElements = props.posts.map((post: {id:number; message: string; likesCount: number; }) => <Post key={post.id} message={post.message} likeCount={post.likesCount}/>)

    let onAddPost = (values:any) => {
        props.addPost(values.newPost)
    };

    return (
        <div className={s.wrapper}>
            <h3>My Post</h3>
            <div className="">
                <AddPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;

const AddPostForm=(props:any)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                    <Field component={TextArea}
                           name={'newPost'}
                           placeholder={'Add new post'}
                    validate={[required,maxLength10 ]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux=reduxForm({form:'AddPost'})(AddPostForm)