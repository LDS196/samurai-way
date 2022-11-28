import React from 'react';
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
    return (
        <div className={s.content}>
            <div className="">
                <img className={s.content__img}
                     src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
                     alt="about"/>
            </div>
            <div className="">Ava</div>
            <MyPosts/>

        </div>
    )
}

export default Profile;