import React from 'react';
import {addPostActionCreator} from "../../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {StateType} from "../../../../redux/redux-store";





const mapStateToProps = (state:StateType) =>{
    return{
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch:(a:any)=>void) =>{
    return{
        addPost: (value:string)=> dispatch(addPostActionCreator(value)),

    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;