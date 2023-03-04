import {instance} from "./api";
import {ResponseType} from "../../types/types";

export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: number, login: string, email: string }>>(`auth/me`)
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ResponseType<{ id: number }>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(res => res.data)
    }
}