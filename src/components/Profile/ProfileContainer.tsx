import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";
import {Redirect, useParams} from 'react-router-dom';


type ParamsType = {
    userId: string
}
type MatchType = {
    params: ParamsType
}
type ProfileContainerType = {
    getUserProfile:(userId: number|string)=>any
    profile: ProfileType | null
    setUserProfile: (profile: ProfileType) => { type: string, profile: ProfileType }
    match: MatchType
    isAuth: boolean
}

export function withRouter(Children: any) {
    return (props: any) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component<ProfileContainerType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2';
        }
        this.props.getUserProfile(userId)
    }


    render() {

        return (
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        )
    }
}

let AuthRedirectComponent = (props:ProfileContainerType)=>{
    if (!props.isAuth) return <Redirect to={'/login'}/>
    return <ProfileContainer {...props}/>
}

let mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);