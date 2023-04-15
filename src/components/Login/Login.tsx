import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {MyInput} from "../common/FormControls/FormsControls";
import {required} from "utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "redux/Auth-reducer";

import {StateType} from "redux/redux-store";
import s from '../common/FormControls/FormsControls.module.css'
import {Navigate} from "react-router-dom";
import {Button,} from "antd";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error,}) => {
    const captchaUrl = useSelector((state: StateType) => state.auth.captchaUrl)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'}
                       name={'email'}
                       component={MyInput}
                       validate={[required]}

                />
            </div>
            <div>
                <Field placeholder={'Password'}
                       type={'password'}
                       name={'password'}
                       component={MyInput}
                       validate={[required]}/>
            </div>
            <div>

                <Field
                    type={"checkbox"}
                    name={'rememberMe'}
                    component={MyInput}/>

            </div>
            <div>
                {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                {captchaUrl &&
                    <Field placeholder={'Enter symbols from image'}
                           name={'captcha'}
                           component={MyInput}
                           validate={[required]}
                    />}
                {error && <div className={s.formSummaryError}>{error}</div>}
            </div>
            <div>
                <Button type={"primary"} htmlType={'submit'}>login</Button>
            </div>
        </form>
    );
};

export const Login: React.FC = () => {

    const isAuth = useSelector((state: StateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
            <p>Email: free@samuraijs.com Password: free</p>
        </div>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

