import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../../../../api';
import Checkbox from '../../../../Checkbox/Checkbox';
import './AdminForumPost.css';

class AdminForumPost extends Component {
    state = {
        id: '',
        content: '',
        reason: '',
        isChecked: false
    }
    componentDidMount() {
        this.setState({
            id: this.props.id,
            content: this.props.content,
            reason: this.props.reason
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            reason: nextProps.reason,
            isChecked: nextProps.isChecked
        })
    }

    render() {
        return (
           <div>
                <div className = 'admin-forum-post-record' id = {this.state.id}>
                    <div className = 'admin-forum-record-checkbox'>
                        <Checkbox 
                            name = 'checkbox-id' 
                            onChange = {this.checkId}
                            checked = {this.state.isChecked}
                        />
                        <div className = {(this.state.reason !== 'show' && this.state.reason !== '') ? 'disabled-post' : null}>{this.state.content}</div>
                    </div>

                    <div className = 'admin-forum-mark-post'>
                        <select 
                            onChange = {this.chooseReason} className = 'admin-forum-select' value = {this.state.reason}>
                            <option value = '' hidden>Скрыть ответ</option>
                            <option value = 'bad language'>Нецензурная брань</option>
                            <option value = 'abuse'>Оскорбление</option>
                            <option value = 'spam'>Спам, реклама, флуд</option>
                            <option value = 'political throw-in'>Политический вброс</option>
                            <option value = 'violence'>Призыв к насилию</option>
                            <option value = 'pornographic content'>Порнографический контент</option>
                            <option value = 'personal data'>Размещение личных данных третьих лиц</option>
                            <option value = 'other'>Другое</option>
                            <option value = 'show' style = {{fontWeight: 600}}>Показать ответ</option>
                        </select> 
                    </div> 
                </div>
           </div>
        )
    }
    checkId = () => {
        this.props.checkId(this.state.id)
        this.setState({
            isChecked: true
        })
    }

    chooseReason = (event) => {
        this.setState({
            reason: event.target.value
        }, () => {
            axios({
                method: 'put',
                url: `${server}/api/forumPost/` + this.state.id,
                data: this.state,
                config: { headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }}
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }
}

export default AdminForumPost;