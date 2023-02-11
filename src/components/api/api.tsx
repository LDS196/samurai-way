import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4840b52a-30a9-4c8b-a10a-9d7d781c35d4'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`, {},).then(res => res.data)
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`).then(res => res.data)
    },
    getProfile(id: number | string) {
        return profileAPI.getProfile(id)
    }
}
export const profileAPI = {
    getProfile(id: number | string) {
        return instance.get(`profile/${id}`);
    },
    getStatus(id: number | string) {
        return instance.get(`profile/status/${id}`);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status});
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email:string,password:string,rememberMe:boolean=false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    }

}