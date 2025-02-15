import {instance} from "./api";
import {PhotosType, profileAPI} from "./profileAPI";
import {ResponseType} from "../../types/types";

type getUsersResponseType = {
    error: null | string
    items: UserType[]
    totalCount: number
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: PhotosType
    status: null | string
    followed: boolean
}


export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<getUsersResponseType>
        (`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend===null?'': `&friend=${friend}`))
            .then(res => res.data)
    },
    unfollowUser(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`, {},)
            .then(res => res.data)
    },
    followUser(id: number) {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(res => res.data)
    },
    getProfile(id: number) {
        return profileAPI.getProfile(id)

    }
}

