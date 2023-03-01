import React from 'react';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Posts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";


export type ProfilePropsType = {
    isOwner:boolean
    profile: ProfileType | null
    status:string
    updateStatus:(status:string)=>void
    savePhoto: any
    saveProfile: any
}

function Profile(props: ProfilePropsType) {

    return (
        <div>
            <ProfileInfo saveProfile={props.saveProfile}  savePhoto={props.savePhoto} isOwner ={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;