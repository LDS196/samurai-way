import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true,
    headers:{
        'API-KEY': '4840b52a-30a9-4c8b-a10a-9d7d781c35d4'
    }
})
export const getUsers = (currentPage:number = 1,pageSize:number= 10) =>{
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(res=> res.data)
}


//
// export const getUsers = (currentPage:number = 1,pageSize:number= 10) : Promise<{items: UserType[], totalCount: number}> =>{
//     return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,{
//         withCredentials:true
//     }).then(res => res.data)
// }

export const unfollowUser = (id:number)=>{
    return instance.post(`follow/${id}`, {}, )
         .then(res=> res.data)
};
export const followUser = (id:number)=>{
    return instance.delete(`follow/${id}`)
        .then(res=> res.data)
};