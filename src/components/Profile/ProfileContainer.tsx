import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";
import {Redirect, useParams} from 'react-router-dom';
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type ParamsType = {
    userId: string
}
type MatchType = {
    params: ParamsType
}
type ProfileContainerType = {
    getUserProfile:(userId: number|string)=>void
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

let AuthRedirectComponent= WithAuthRedirect<ProfileContainerType>(ProfileContainer)

// let mapStateToPropsForRedirect = (state: StateType) => ({
//     isAuth: state.auth.isAuth
// })
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)

let mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile,
})

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);