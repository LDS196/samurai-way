import React, {ComponentType} from "react";
import {ProfileDataType} from "./ProfileInfo";
import {DecoratedComponentClass, DecoratedFormProps, Field, InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../redux/profile-reducer";
import {Input, TextArea} from "../../common/FormControls/FormsControls";
import {required} from "../../../utils/validators/validators";

interface ProfileDataFormType{
    profile: ProfileType
}

interface SubmitForm {
    fullName:string
}

 const ProfileDataForm = ({profile,handleSubmit, ...restProps} : InjectedFormProps<SubmitForm, ProfileDataFormType> & ProfileDataFormType) => {


    return (
        <form onSubmit={handleSubmit}>form
            <div>
                <button>save</button>
            </div>
            <div>Full name:
                <Field placeholder={'Full name'}
                       name={'fullName'}
                       component={Input}
                       validate={[]}
                />
            </div>
            <div>UserId:
                {profile.userId}
            </div>
            <div> About me:
                <Field placeholder={'About me'}
                    name={'aboutMe'}
                    component={TextArea}
                    validate={[]}
                />
            </div>
            <div>Looking for a job:
                <Field
                       name={'lookingForAJob'}
                       component={Input}
                       validate={[]}
                       type={'checkbox'}
                />
            </div>
            <div>Job description:
                <Field
                    placeholder={'My professional skills'}
                    name={'lookingForAJobDescription'}
                    component={TextArea}
                    validate={[]}
                />
            </div>
            {/*<div>*/}
            {/*    Contacts*/}
            {/*    {*/}
            {/*        Object.keys(profile.contacts).map((key) => {*/}

            {/*            return <Contact key={key} contactTitle={key}*/}
            {/*                            contactValue={profile?.contacts ? profile.contacts[key as ContactsKey] : ''}/>*/}
            {/*        })}*/}
            {/*</div>*/}
        </form>
    )
}
const ProfileDataFormReduxForm= reduxForm<SubmitForm,ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;