import React from 'react';
import style from './users.module.css';
import axios from "axios";
import userPhoto from '../../assets/img/user.png'

const Usersold = (props:any) => {
let getUsers = ()=>{
    if(props.users.length === 0){
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response =>{
            props.setUsers((response.data.items))
        } )
        // props.setUsers([
        //     {id: 1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: false, fullName: 'Dmitrii', status: "Boss", location: {city: "Dubai", country: "UAE",}},
        //     {id: 2, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: true, fullName: 'Vasya', status: "Boss", location: {city: "Moscow", country: "Russian",}},
        //     {id: 3, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: false, fullName: 'Nika', status: "Boss", location: {city: "Ukraine", country: "Ukraine",}},
        //     {id: 4, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9D%D0%B0%D0%B3%D0%B8%D0%B5%D0%B2_%D0%BD%D0%B0_%D1%84%D0%B8%D0%BD%D0%B0%D0%BB%D0%B5_%D0%93%D0%BE%D0%BB%D0%BE%D1%81._%D0%94%D0%B5%D1%82%D0%B8_5_%28cropped%29.jpg', followed: false, fullName: 'Peter', status: "Boss", location: {city: "Abu Dhabi", country: "UAE",}},
        // ])
    }
}


    return (
        <div>
            <button onClick={getUsers}>Get</button>
            {props.users.map((u:any) => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small!= null? u.photos.small: userPhoto} alt="Avatar" className={style.userPhoto}/>
                    </div>
                    <div>
                        {u.followed?<button onClick={()=>{
                            props.unfollow(u.id)}}>Follow</button>:<button onClick={()=>{props.follow(u.id)}}>Unfollow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)}
        </div>
    );
};

export default Usersold;