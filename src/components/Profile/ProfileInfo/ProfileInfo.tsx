import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";

import ProfileStatusWithHooks from "../ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/user.png";
import {ContactsKey, ProfileType, saveProfile} from "../../../redux/profile-reducer";

import ProfileDataFormReduxForm from "./ProfileDataForm";

type ContactType = {
    contactTitle: string
    contactValue: string
}
export type ProfileDataType = {
    profile: ProfileType
    isOwner:boolean
    edit:()=>void
}
export type ProfileInfoPropsType = {
    isOwner:boolean
    profile: ProfileType | null
    status:string
    updateStatus:(status:string)=>void
    savePhoto: any
    saveProfile:any
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
    const onSubmit = (formData: any) => {

        props.saveProfile(formData)
    }

    return (
        <div>
            <div className={s.wrapper}>
                <img style={{width: '150px'}} src={props.profile.photos.large || userPhoto} alt=""/>
                <div>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                {editMode
                    ?<ProfileDataFormReduxForm
                        profile={props.profile}
                        onSubmit={onSubmit}
                    />
                    :<ProfileData profile={props.profile} isOwner={props.isOwner} edit={()=>setEditMode(true)}/>
                }

            </div>
        </div>

    )
}

const ProfileData: React.FC<ProfileDataType> = ({profile,isOwner,edit}) => {

    return <div>

        {isOwner &&<div><button onClick={edit}>Edit</button></div>}
        <div>
            {profile.fullName ? profile.fullName : 'fullName'}
        </div>
        <div>
            {profile.userId}
        </div>
        <div>
            {profile.aboutMe ? profile.aboutMe : 'aboutMe'}
        </div>
        <div>
            {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
            {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : 'JobDescription'}
        </div>
        <div>
            Contacts
            {
                Object.keys(profile.contacts).map((key) => {

                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile?.contacts ? profile.contacts[key as ContactsKey] : ''}/>
                })}
        </div>
    </div>
}
export const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div>
        <span>{contactTitle}</span> <span>{contactValue}</span>
    </div>
}

export default ProfileInfo;