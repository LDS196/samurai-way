import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect, useSelector} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import {StateType} from "../../redux/redux-store";
import s from '../common/FormControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha:string
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error,}) => {
    const captchaUrl = useSelector((state:StateType)=> state.auth.captchaUrl)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'}
                       name={'email'}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field placeholder={'Password'}
                       type={'password'}
                       name={'password'}
                       component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field type={"checkbox"}
                       name={'rememberMe'}
                       component={'input'}/>remember me
            </div>
            <div>
                {captchaUrl&& <img src={captchaUrl} alt="captcha"/>}
                {captchaUrl&&
                    <Field placeholder={'Enter symbols from image'}
                           name={'captcha'}
                           component={Input}
                           validate={[required]}
                    />}
                {error && <div className={s.formSummaryError}>{error}</div>}
            </div>
            <div>
                <button>login</button>
            </div>
        </form>
    );
};

const Login = (props: any) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
const mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export default connect(mapStateToProps, {login})(Login);