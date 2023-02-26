import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {getAuthUserData, logout,} from "../../redux/Auth-reducer";


export type HeaderContainerType = {

    isAuth: boolean
    login: string | null
    logout: any  // type thanks

}

class HeaderContainer extends React.Component<HeaderContainerType> {


    render() {
        return <Header {...this.props}/>
        // {...this.props}
    }
}

const mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {logout})(HeaderContainer);