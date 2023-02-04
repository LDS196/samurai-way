import React from 'react';



export const LoginForm = (props: any) => {
    return (
            <form action="">
                <div>
                    <input placeholder={'Login'}/>
                </div>
                <div>
                    <input placeholder={'Password'}/>
                </div>
                <div>
                    <input type={"checkbox"}/>remember me
                </div>
                <div>
                    <button>
                        login
                    </button>
                </div>

            </form>

    );
};
export const Login = (props: any) => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
        </div>
    );
};