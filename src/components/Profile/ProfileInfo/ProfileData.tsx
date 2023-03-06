import React from "react";
import {ContactsKey, ProfileType} from "../../api/profileAPI";

type ContactType = {
    contactTitle: string
    contactValue: string
}
export type ProfileDataType = {
    profile: ProfileType
    isOwner:boolean
    edit:()=>void
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
const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div>
        <span>{contactTitle}</span> <span>{contactValue}</span>
    </div>
}

export default ProfileData