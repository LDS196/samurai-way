import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { MyInput, Textarea} from "../../common/FormControls/FormsControls";
import s from "../../common/FormControls/FormsControls.module.css";
import { ProfileType} from "../../api/profileAPI";
import {Button} from "antd";

type PropsType = {
    profile: ProfileType| null
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, error, profile}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Button size={"small"} htmlType={'submit'} type={"primary"}>Save Profile</Button>
            </div>
            <div>
                {error && <div className={s.formSummaryError}>{error}</div>}
            </div>
            <div>Full name:
                <Field placeholder={'Full name'}
                       name={'fullName'}
                       component={MyInput}
                       validate={[]}
                />
            </div>
            <div>UserId:
                {profile?.userId}
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
                    component={MyInput}
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
                {profile?
                    Object.keys(profile.contacts).map((key) => {
                        return <div key={key}>
                            <b>{key}</b>
                            <Field placeholder={key}
                                   name={'contacts.' + key}
                                   component={MyInput}
                                   validate={[]}
                            />
                        </div>
                    })
                :<div></div>}
            </div>
        </form>
    )
}
export default reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)
