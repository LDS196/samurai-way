import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../api/profileAPI";
import MyPosts from "components/Profile/MyPosts/Posts/MyPosts";


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
            <MyPosts/>
        </div>
    )
}

export default Profile;