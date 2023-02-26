import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";
import {compose} from "redux";
import {useParams} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type ParamsType = {
    userId: string
}
type MatchType = {
    params: ParamsType
}
type ProfileContainerType = {
    getStatus:(userId: number|string)=>void
    getUserProfile:(userId: number|string)=>void
    profile: ProfileType | null
    setUserProfile: (profile: ProfileType) => { type: string, profile: ProfileType }
    match: MatchType
    isAuth: boolean
    status:string
    updateStatus:(status:string)=>void
    authorizedUserId: number

}

export function withRouter(Children: any) {
    return (props: any) => {
        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component<ProfileContainerType> {

    componentDidMount() {
        let userId = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId;
            if(!userId) {
                console.log(this.props)
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }


    render() {

        return (
            <div>
                <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}
let mapStateToProps = (state: StateType) => ({
    profile: state.profilePage.profile,
    status:state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})
export default compose<React.FC>(
    connect(mapStateToProps, {getUserProfile,getStatus, updateStatus}),
    withRouter,
     WithAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent= WithAuthRedirect(ProfileContainer)

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);