import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../../../../api';
import './AdminForumInfo.css';

class AdminForumInfo extends Component {
    state = {
        usersLength: 0,
        groupsLength: 0,
        topicsLength: 0,
        postsLength: 0,
    }

    componentDidMount() {
        this.getInfo()
    }
    componentWillReceiveProps(nextProps) {
        this.getInfo()
    }

    render() {
        return(
            <div className = 'forum-info'>
                <div className = 'forum-info-block'>
                    <div>Количество групп:</div>
                    <div className = 'forum-info-number'>{this.state.groupsLength}</div>
                </div>
                <div className = 'forum-info-block'>
                    <div>Количество тем:</div>
                    <div className = 'forum-info-number'>{this.state.topicsLength}</div>
                </div>
                <div className = 'forum-info-block'>
                    <div>Количество ответов:</div>
                    <div className = 'forum-info-number'>{this.state.postsLength}</div>
                </div>
                <div className = 'forum-info-block'>
                    <div>Количество пользователей:</div>
                    <div className = 'forum-info-number'>{this.state.usersLength}</div>
                </div>
            </div>
        )
    }
    getInfo = () => {
        axios({
            method: 'get',
            url: `${server}/api/forumInfo/`,
            config: {headers: {'Content-Type': 'application/json; charset=UTF-8'}},
        })
        .then(response => this.setState({
            usersLength: response.data.forumUsers,
            groupsLength: response.data.forumGroups,
            topicsLength: response.data.forumTopics,
            postsLength: response.data.forumPosts
        }))
        .catch(function (error) {
            console.log(error);
        })
    }
}
export default AdminForumInfo;