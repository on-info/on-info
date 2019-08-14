import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../../../../api';
import AdminNewsSearch from '../../AdminNewsSearch/AdminNewsSearch';
import AdminForumPost from '../AdminForumPost/AdminForumPost';
import './AdminForumPostsList.css';

class AdminForumPostsList extends Component {
    state = {
        checkedPostsIds: [],
        posts: [],
        filteredPosts: []
    }

    componentDidMount() {
        this.getRecords()
    }

    render() {
        return(
            <div className = 'forum-posts-list'>
                <div className = 'search-post'>
                    <AdminNewsSearch findNews = {this.findRecord} /> 
                    <select 
                        onChange = {this.chooseReason} 
                        className = 'admin-forum-select' 
                        value = 'Скрыть ответы'
                        disabled = {this.state.checkedPostsIds.length ? false : true}
                    >
                        <option value = '' hidden>Скрыть ответы</option>
                        <option value = 'bad language'>Нецензурная брань</option>
                        <option value = 'abuse'>Оскорбление</option>
                        <option value = 'spam'>Спам, реклама, флуд</option>
                        <option value = 'political throw-in'>Политический вброс</option>
                        <option value = 'violence'>Призыв к насилию</option>
                        <option value = 'pornographic content'>Порнографический контент</option>
                        <option value = 'personal data'>Размещение личных данных третьих лиц</option>
                        <option value = 'other'>Другое</option>
                        <option value = 'show' style = {{fontWeight: 600}}>Показать ответы</option>
                    </select> 
                </div>
                <div className = 'way' onClick = {this.changeMode}> 
                    <span>{this.props.topic.group_id.groupTitle} > </span>
                    <span>{this.props.topic.topicTitle}</span>
                </div>
                <div key = "admin-forum-list" className = 'forum-current-info'>
                    <div className = 'forum-current'>Текущие ответы:</div>
                    <div>
                        {this.state.filteredPosts.map(item => 
                            <AdminForumPost 
                                reason = {item.reason}
                                content = {item.content} 
                                id = {item._id}
                                key = {item._id}  
                                checkId = {this.checkId}
                                changeState = {this.props.changeState}
                                chooseReason = {this.chooseReason}
                                isChecked = {this.state.checkedPostsIds.includes(item._id)}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    getRecords = () => {
        axios({
            method: 'get',
            url: `${ server }/api/forumPost?query=${this.props.topic._id}`
        })
        .then((result) => {
            this.setState({  
                posts: result.data.forumPosts,          
                filteredPosts: result.data.forumPosts
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
    }

    findRecord = (title) => {
        let {posts} = this.state
        if(title) {
            this.setState({
                filteredPosts: posts.filter((item) => {
                    return item.content.toLowerCase().includes(title)
                }) 
            })
        } else {
            this.setState({
                filteredPosts: this.state.posts,
            }) 
        }
    }

    chooseReason = (event) => {
        let {filteredPosts} = this.state
        for (let i = 0; i < filteredPosts.length; i++) {
            if(this.state.checkedPostsIds.includes(filteredPosts[i]._id)) {
                filteredPosts[i].reason = event.target.value
                axios({
                    method: 'put',
                    url: `${server}/api/forumPost/` + filteredPosts[i]._id,
                    data: filteredPosts[i],
                    config: { headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }}
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
        this.setState({
            filteredPosts: filteredPosts,
            checkedPostsIds: []
        })
    }

    changeMode = () => {
        this.props.changeMode('groups')
    }

    checkId = (id) => {
        let tempId = this.state.checkedPostsIds;
        if (~this.state.checkedPostsIds.indexOf(id)) {
            tempId.splice(tempId.indexOf(id), 1)
        } else {
            tempId.push(id)
        }
        this.setState({
            checkedPostsIds: tempId,
        })
    }
}

export default AdminForumPostsList;