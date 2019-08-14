import React, {Component} from 'react';
import Button from '../../../Button/Button';
import moment from 'moment';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './AdminNews.css';
import axios from 'axios';
import {server} from '../../../../api';
import Checkbox from '../../../Checkbox/Checkbox';
import jsonpAdapter from 'axios-jsonp';
class AdminNews extends Component {
    state = {
        id: ''
    }
    componentDidMount (){
        this.setState({
            id:this.props.news._id,
            isPublic:this.props.news.isPublic,
            createdAt: this.props.news.createdAt,
            title: this.props.news.title,
            idVk:this.props.news.idVK
        })
    }
    render() {
       return (
           <div className="news-admin" id = {this.state.id}>
                <div className = "news-admin-checkbox">
                    <Checkbox 
                        name = "checkbox-id" 
                        onChange = {this.checkId}
                    />
                    <div onClick = {this.showNews} className = "news-admin-title">{this.state.title}</div>
                </div>
                <div readOnly>{moment(this.state.createdAt).format('DD-MM-YYYY')}</div>
                <div>{this.state.isPublic ? 'Да' : 'Нет'}</div>
                <div>
                    <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.submit}
                    />
                   </div>
                <div>                
                    <Button
                        name = {this.state.isPublic ? 'button-publish-news':'button-not-publish-news'}
                        label = {this.state.isPublic? 'Отменить публикацию':'Опубликовать'}
                        clickHandler = {this.handleClick}
                    />
                </div>
               
           </div>
       )
    }
    checkId = () => {
        this.props.checkId(this.state.id)
    }
    showNews = () => {
        this.props.showNews(this.state.id)
    }
    handleClick = () => {
        this.setState({isPublic: !this.state.isPublic}, this.sendStatus)
        this.state.isPublic ? this.deletePostVK(this.props.news) : this.restorePostVK(this.props.news);
    }
    deletePostVK = (news) => {
        let token = '37ad70cb0eaf87ba4a7c79f6ade8668740959edbe1f09250664e6ac748ea496a5a305b8efad4cfe29b679';
        let id = '-169499477';
        axios({
            method: 'delete',
            adapter: jsonpAdapter,
            url: `https://api.vk.com/method/wall.delete?owner_id=${id}&post_id=${news.idVK}&access_token=${token}&v=5.80`            
        })
      };
      restorePostVK = (news) => {
        let token = '37ad70cb0eaf87ba4a7c79f6ade8668740959edbe1f09250664e6ac748ea496a5a305b8efad4cfe29b679';
        let id = '-169499477';
        axios({
            method: 'delete',
            adapter: jsonpAdapter,
            url: `https://api.vk.com/method/wall.restore?owner_id=${id}&post_id=${news.idVK}&access_token=${token}&v=5.80`            
        })
      };
    sendStatus = () => {
        axios({
            method: 'put',
            url: `${server}/api/news/`+this.state.id,
            data: {'isPublic': this.state.isPublic},
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }}
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    submit = () => {
        confirmAlert({
          title: 'Подтвердите удаление новости',
          message: 'Вы точно хотите удалить новость?',
          buttons: [
            {
              label: 'Да',
              onClick: (item) => this.props.deleteHandler(item)
            },
            {
              label: 'Нет',
              onClick: () => {}
            }
          ]
        })
    }
}

export default AdminNews;
