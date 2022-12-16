import React from 'react';

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Posts/MyPostsContainer";



function Profile(props: any) {

    return (
        <div>
            <ProfileInfo />
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;