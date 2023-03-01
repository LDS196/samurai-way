import React, {ChangeEvent, useEffect, useState,} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<ProfileStatusType> = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState(false)
    let [tempStatus, setTempStatus] = useState(status)
    useEffect(() => {
        setTempStatus(status)
    }, [status])
    const activateEditMode = () => {
        setEditMode(true);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempStatus(e.currentTarget.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(tempStatus)
    }
    return (
        <div>
            {
                editMode
                    ? <div>
                        <input onChange={onStatusChange} value={tempStatus} onBlur={deactivateEditMode}
                               autoFocus={true}></input>
                    </div>
                    : <div>My status:
                        <span onDoubleClick={activateEditMode}>{tempStatus || 'No status'}</span>
                    </div>
            }
        </div>

    );
}


export default ProfileStatusWithHooks;