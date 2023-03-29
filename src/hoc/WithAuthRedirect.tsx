import React, {Component, ComponentType} from 'react';
import {Navigate} from "react-router-dom";
import {StateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToProps = {
    isAuth: boolean
}
type DispatchPropsType = {
}
let mapStateToPropsForRedirect = (state: StateType) => ({
    isAuth: state.auth.isAuth
})

export function WithAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent: React.FC<MapStateToProps & DispatchPropsType> = (props)=> {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={'/login'}/>
        return <Component{...restProps as T}/>
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent)
};

