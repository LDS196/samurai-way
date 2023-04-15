import React from "react";
import {ContactsKey, ProfileType} from "../../api/profileAPI";
import {Button} from "antd";
import {NavLink} from "react-router-dom";
import s from 'components/Profile/Profile.module.css'

type ContactType = {
    contactTitle: string
    contactValue: string
}
export type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    edit: () => void
}
const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, edit}) => {

    return (
        <div className={s.list}>

            {isOwner && <div style={{textAlign:'right'}}><Button type={'primary'} size={"small"} onClick={edit}>Edit Profile</Button></div>}
            <div className={s.item}>
                <span className={s.itemTitle}>Full Name:</span>
                <span
                className={s.itemSubTitle}>{profile.fullName ? profile.fullName : 'fullName'}
                </span>
            </div>
            <div className={s.item}>
                <span className={s.itemTitle}>UserId:</span>
                <span
                    className={s.itemSubTitle}>{profile.userId ? profile.userId : 'userId'}
                </span>
            </div>
            <div className={s.item}>

                <span className={s.itemTitle}>About Me:</span>
                <span
                    className={s.itemSubTitle}>{profile.aboutMe ? profile.aboutMe : 'aboutMe'}
                </span>
            </div>
            <div className={s.item}>
                <span className={s.itemTitle}>Look for job:</span>
                <span
                    className={s.itemSubTitle}>{profile.lookingForAJob ? 'Yes' : 'No'}
                </span>
            </div>
            <div className={s.item}>
                <span className={s.itemTitle}>Job Description:</span>
                <span
                    className={s.itemSubTitle}>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : 'JobDescription'}
                </span>

            </div>
            <div className={s.item}>
                Contacts :
                {
                    Object.keys(profile.contacts).map((key) => {

                        return <Contact key={key} contactTitle={key}
                                        contactValue={profile?.contacts ? profile.contacts[key as ContactsKey] : ''}/>
                    })}
            </div>
        </div>
    )
}
const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div>
        <span className={s.itemTitle}>{contactTitle}:</span>
        <NavLink target={"_blank"} to={contactValue}>{contactValue}</NavLink>
    </div>
}

export default ProfileData