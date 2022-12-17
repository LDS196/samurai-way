import React from 'react';
import style from './users.module.css';
import axios from "axios";
import userPhoto from '../../assets/img/user.png'

class Users extends React.Component<any, any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    };

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)

            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div>
                {pages.map(p => <span key={p} className={this.props.currentPage === p ? style.selectedPage : ''}
                                      onClick={(e) => {
                                          this.onPageChanged(p)
                                      }}>{p}</span>)}

                {this.props.users.map((u: any) =>
                    <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="Avatar"
                             className={style.userPhoto}/>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                            this.props.unfollow(u.id)
                        }}>Follow</button> : <button onClick={() => {
                            this.props.follow(u.id)
                        }}>Unfollow</button>}
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
    }
}

export default Users;