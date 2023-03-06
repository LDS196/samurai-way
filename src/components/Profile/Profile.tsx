import React from 'react';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Posts/MyPostsContainer";
import {ProfileType} from "../api/profileAPI";




export type ProfilePropsType = {
    isOwner:boolean
    profile: ProfileType |null
    status:string
    updateStatus:(status:string)=>void
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
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