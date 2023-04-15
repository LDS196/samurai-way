import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4840b52a-30a9-4c8b-a10a-9d7d781c35d4'
    }
})

