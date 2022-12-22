import React from 'react';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Posts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";


export type ProfilePropsType = {
    profile: ProfileType | null
}

function Profile(props: ProfilePropsType) {

    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;