import React, {ChangeEvent,} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType,StateType> {

    state = {
        editMode: true,
        status: this.props.status
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }
    activateEditMode = () => {
        this.setState({editMode: false});
    }
    deactivateEditMode = () => {
        this.setState({editMode: true});
        this.props.updateStatus(this.state.status)
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status:this.props.status})
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode
                        ? <div>
                            <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>
                        </div>
                        : <div>
                            <input onChange={this.onStatusChange} value={this.state.status} onBlur={this.deactivateEditMode}
                                   autoFocus={true}></input>
                        </div>
                }
            </div>

        );
    }

}

export default ProfileStatus;