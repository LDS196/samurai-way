import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";

import {useParams} from 'react-router-dom';

type ParamsType = {
    userId: string
}
type MatchType = {
    params: ParamsType
}
type ProfileContainerType = {
    profile: ProfileType | null
    setUserProfile: (profile: ProfileType) => { type: string, profile: ProfileType }
    match: MatchType
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
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
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);