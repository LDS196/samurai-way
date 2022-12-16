import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";



// function MyPostsContainer(props: any) {
//     let state = props.store.getState()
//     let addPost: any = () => {
//         props.store.dispatch(addPostActionCreator());
//     }
//
//     let onPostChange = (text:string) => {
//         let action = updateNewPostTextActionCreator(text)
//         props.store.dispatch(action);
//     }
//
//     return <MyPosts addPost={addPost}
//                     updateNewPostText={onPostChange}
//                     posts={state.profilePage.posts}
//                     newPostText={state.profilePage.newPostText}/>
// }

const mapStateToProps = (state:any) =>{
    return{
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch:any) =>{
    return{

        addPost: ()=> dispatch(addPostActionCreator()),

        updateNewPostText: (text:string)=>{
            let action = updateNewPostTextActionCreator(text)
            dispatch(action);
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;