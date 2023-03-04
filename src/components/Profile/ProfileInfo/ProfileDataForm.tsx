import React from "react";
import { Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormControls/FormsControls";
import s from "../../common/FormControls/FormsControls.module.css";
import {ContactsType, ProfileType} from "../../api/profileAPI";

interface ProfileDataFormType{
    profile: ProfileType
}
interface SubmitForm {
    fullName:string
    aboutMe:string
    contacts: ContactsType
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
}
 const ProfileDataForm = ({profile,handleSubmit,error} : InjectedFormProps<SubmitForm, ProfileDataFormType> & ProfileDataFormType) => {

    return (
        <form onSubmit={handleSubmit}>form
            <div>
                <button>save</button>
            </div>
            <div>
                {error && <div className={s.formSummaryError}>{error}</div>}
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
                    component={Textarea}
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
                    component={Textarea}
                    validate={[]}
                />
            </div>
            <div>
                Contacts
                {
                    Object.keys(profile.contacts).map((key) => {
                        return <div key={key}>
                            <b>{key}</b>
                            <Field placeholder={key}
                                   name={'contacts.' + key}
                                   component={Input}
                                   validate={[]}
                            />
                        </div>
                    })}
            </div>
        </form>
    )
}
const ProfileDataFormReduxForm= reduxForm<SubmitForm,ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;