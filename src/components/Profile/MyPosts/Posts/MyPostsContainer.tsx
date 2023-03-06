import React from 'react';
import {addPostActionCreator} from "../../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {StateType} from "../../../../redux/redux-store";
import {Dispatch} from "redux";





const mapStateToProps = (state:StateType) =>{
    return{
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch:Dispatch) =>{
    return{
        addPost: (value:string)=> dispatch(addPostActionCreator(value)),
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;