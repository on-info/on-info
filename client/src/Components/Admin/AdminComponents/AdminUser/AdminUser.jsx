import React, {Component} from 'react';
import Button from '../../../Button/Button';
import './AdminUser.css';
import { server } from '../../../../api'
import axios from 'axios'

class AdminUser extends Component {
    state = {
        isSubscribe: true,
        error: null
    }
    componentDidMount() {
        this.setState({isSubscribe: this.props.user.isSubscribeStatus})
    }
    render() {
        const {isSubscribe, error} = this.state;
        if (error) {
            return <p>{error.message}</p>
        }

        return (
            <div className={this.state.isSubscribe ? "admin-part-user" : "admin-part-user unsubscribed"}>
                <div>{this.props.user.email}</div>
                <Button 
                    name = "button-admin" 
                    label = {this.state.isSubscribe ? 'Отписать' : 'Подписать'} 
                    clickHandler = {this.handleClick} 
                />
            </div>
        ) 
    }
    handleClick = () => {
        axios({
            url:`${server}/api/subscription/${this.props.user._id}/subscribe`,
            method:'put',
            config:{
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        })
            .then(res => this.setState({isSubscribe: res.data.subscriber.isSubscribeStatus}))
            .catch(error => this.setState({error}))
    }
}

export default AdminUser;




               