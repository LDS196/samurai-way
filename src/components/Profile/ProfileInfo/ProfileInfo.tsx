import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/user.png";

import {ProfileType} from "../../api/profileAPI";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";


export type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileType| null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}
const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length != 0) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
        //todo remove then
        props.saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }

    return (
        <div>
            <div className={s.wrapper}>
                <img style={{width: '150px'}} src={props.profile.photos.large || userPhoto} alt=""/>
                <div>
                    <label htmlFor='avatar'>Select a file: </label>
                    {props.isOwner && <input id={'avatar'} type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                {editMode
                    ? <ProfileDataForm
                        initialValues={props.profile}
                        profile={props.profile}
                        onSubmit={onSubmit}

                    />
                    : <ProfileData profile={props.profile}
                                   isOwner={props.isOwner}
                                   edit={() => setEditMode(true)}/>
                }

            </div>
        </div>

    )
}


export default ProfileInfo;