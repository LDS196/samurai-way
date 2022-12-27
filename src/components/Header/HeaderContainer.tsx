import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {DataType, setAuthUserData} from "../../redux/Auth-reducer";

export type HeaderContainerType = {
    isAuth: boolean
    login: string | null
    setAuthUserData: (id: number, email: string, login: string) => {
        type: string,
        data: DataType
    }
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }

            })
    }

    render() {
        return <Header {...this.props}/>
        // {...this.props}
    }
}
const mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);