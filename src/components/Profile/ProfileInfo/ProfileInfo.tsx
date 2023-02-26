import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePropsType} from "../Profile";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";




const ProfileInfo = (props: ProfilePropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img className={s.content__img}*/}
            {/*         src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="*/}
            {/*         alt="about"/>*/}
            {/*</div>*/}
            <div className={s.wrapper}>
                <img src={props.profile.photos.large} alt=""/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>

    )
}


export default ProfileInfo;