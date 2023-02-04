import React from 'react';
import {Field, reduxForm} from "redux-form";



export const LoginForm = (props: any) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Login'} name={'login'} component={'input'}/>
                </div>
                <div>
                    <Field placeholder={'Password'} name={'password'} component={'input'}/>
                </div>
                <div>
                    <Field type={"checkbox"} name={'rememberMe'} component={'input'}/>remember me
                </div>
                <div>
                    <button>
                        login
                    </button>
                </div>

            </form>

    );
};

const LoginReduxForm= reduxForm({form:'login'})(LoginForm)

export const Login = (props: any) => {
    const onSubmit=(formData:any)=>{
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};