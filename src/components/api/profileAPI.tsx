import {instance} from "./api";
import {ResponseType} from "../../types/types";
export type PhotosType = {
    small: string| null
    large: string| null
}
export type ContactsKey = keyof ContactsType
export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type ProfileType={
    aboutMe: string,
    contacts: ContactsType
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}

export const profileAPI = {
    getProfile(id: number) {
        return instance.get<ProfileType>(`profile/${id}`)
            .then(res=> res.data)
    },
    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`)
            .then(res=> res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status: status})
            .then(res=> res.data)
    },
    savePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<ResponseType<{photos:PhotosType}>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res=> res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
            .then(res=> res.data)
    }
}