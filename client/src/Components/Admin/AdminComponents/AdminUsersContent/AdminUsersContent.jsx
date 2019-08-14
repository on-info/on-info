import { server } from '../../../../api';
import React, {Component} from 'react';
import AdminUserSearch from '../AdminUserSearch/AdminUserSearch';
import AdminUsersList from '../AdminUsersList/AdminUsersList';
import "../../../../App.css";
import axios from 'axios'


class AdminUsersContent extends Component {
    state = {
        users: [],
        filteredUsers: [],
        isLoading: true,
        error: null
    }
    componentDidMount() {
        axios({
            url:`${ server }/api/subscription`,
            method:'get',
            mode:'cors'
        })
            .then(res => this.setState({users: res.data.subscribers, filteredUsers: res.data.subscribers, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}))
    }
    render() {
        const {isLoading, error} = this.state
        if (isLoading) {
            return <p>Loading ...</p>
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return(
            <div className="list-container">
                <AdminUserSearch findUser={this.findUser} />
                <AdminUsersList users={this.state.filteredUsers} loading={this.state.isLoading} /> 
            </div>
        )
    }
    findUser = (email) => {
        if(!email) {
            axios({
                url:`${ server }/api/subscription`,
                method:'get',
                mode:'cors'
            })
                .then(res => this.setState({filteredUsers: res.data.subscribers}))
                .catch(error => this.setState({error}))
        } else {
            const {users} = this.state
            this.setState({
                filteredUsers: users.filter((item) => {
                    return item.email.includes(email)
                })
            })
        }
    }
}

export default AdminUsersContent;



