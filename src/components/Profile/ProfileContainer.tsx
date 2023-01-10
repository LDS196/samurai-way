import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";

import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {useParams} from "react-router-dom";

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
let mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile,
})
export default compose<React.FC>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent= WithAuthRedirect(ProfileContainer)

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);