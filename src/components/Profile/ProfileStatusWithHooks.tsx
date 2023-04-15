import React, {ChangeEvent, useEffect, useState,} from 'react';
import Input from "antd/lib/input/Input";
import {EditOutlined} from "@ant-design/icons";


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
                        <Input onChange={onStatusChange} value={tempStatus} onBlur={deactivateEditMode}
                               autoFocus={true}></Input>

                    </div>
                    : <div style={{display:'flex', gap:'0 10px', fontWeight:'500',fontSize:'16px'}}>
                        <span >My status:</span>
                        <span onDoubleClick={activateEditMode}>{tempStatus || 'No status'}</span>
                        <EditOutlined onClick={activateEditMode} />
                    </div>
            }
        </div>

    );
}


export default ProfileStatusWithHooks;