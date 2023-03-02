import React, { Component, ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {StateType} from "../redux/redux-store";
import {connect} from "react-redux";

type WithAuthRedirectProps = {
    isAuth: boolean
}
let mapStateToPropsForRedirect = (state: StateType) => ({
    isAuth: state.auth.isAuth
})
export function WithAuthRedirect<T>(Component: ComponentType<T>) {

    class RedirectComponent extends React.Component<WithAuthRedirectProps> {

        render() {
            const {isAuth, ...restProps} = this.props
            // if (!isAuth) return redirect("/login");
             if (!isAuth) return <Redirect to={'/login'}/>
            return <Component{...restProps as T}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
};

