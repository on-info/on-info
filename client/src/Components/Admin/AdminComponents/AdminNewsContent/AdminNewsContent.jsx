import React, {Component} from 'react';
import AdminNewsList from '../AdminNewsList/AdminNewsList';
import AdminNewsSearch from '../AdminNewsSearch/AdminNewsSearch';
import Button from '../../../Button/Button';
import './AdminNewsContent.css';
import { server } from '../../../../../src/api';
import { Route } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import jsonpAdapter from 'axios-jsonp';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import rubbishImg from '../../../../Assets/AssetsSvg/mbri-trash.svg';

class AdminNewsContent extends Component {
    state = {
        news: [],
        filteredNews: [],
        isLoading: true,
        error: null,
        checkedIds: []
    }
    componentDidMount() {
            axios({
                url:`${server}/api/news?isAdmin=true`,
                method:'get',
                mode:'cors'
            })
        .then(res => this.setState({news: res.data.news, filteredNews: res.data.news, isLoading: false}))
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
            <div className="admin-position-content">
                <div className="new-news">
                    <AdminNewsSearch findNews = {this.findNews} /> 
                    <div className="button-new-news">                     
                        <Route render={({history}) => (
                            <Button 
                                name = "button-admin" 
                                label = "Создать" 
                                clickHandler = {() => { history.push('/admin-panel/news/create') }}
                            />
                        )} />
                    </div>
                </div>  
                <Button
                    name = "delete-news" 
                    clickHandler = {this.submit}
                    disabled = {this.state.checkedIds.length ? false : true}
                    label = {<div>
                                <img src={rubbishImg} alt='' />
                                <span>Удалить</span>
                            </div>}
                />
                <AdminNewsList 
                    news = {this.state.filteredNews} 
                    loading={this.state.isLoading}  
                    deleteNews = {this.deleteNews}
                    checkId = {this.checkId}
                /> 
            </div>
        )
    }
    deleteNews = (news) =>{
        let id = news._id
        axios({
            method: 'delete',
            url: `${server}/api/news/` + id,
            data: news,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.setState({            
                filteredNews: this.state.filteredNews.filter(item => item._id !== result.data.news._id)
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
        this.deletePostVK(news);
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
    checkId = (id) => {
        let tempId = this.state.checkedIds;
        if (~this.state.checkedIds.indexOf(id)) {
            tempId.splice(tempId.indexOf(id), 1)
        } else {
            tempId.push(id)
        }
        this.setState({checkedIds: tempId})
    }
    submit = () => {
        confirmAlert({
          title: 'Подтвердите удаление новостей',
          message: 'Вы точно хотите удалить ' + this.state.checkedIds.length + ' новости(ей)?',
          buttons: [
            {
              label: 'Да',
              onClick: (item) => this.deleteChosenNews(item)
            },
            {
              label: 'Нет',
              onClick: () => {}
            }
          ]
        })
    }
    deleteChosenNews = (news) => {
        axios({
            method: 'delete',
            url: `${server}/api/news`,
            data: {'checkedIds': this.state.checkedIds},
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.setState({            
                filteredNews: this.state.filteredNews.filter(news => !~result.data.news.indexOf(news._id)),
                checkedIds: []
            }) 
        })
        .catch(function (error) {
            console.log(error);
        });
        this.deleteChosenPostsVK();
        
    } 
    deleteChosenPostsVK = () => {
        let newsState = this.state.news;
        let deletionsNews = [];
        for (let i = 0; i < this.state.checkedIds.length; i++) {
            let arrayIds = this.state.checkedIds;
            let b = _.filter(newsState , (news) => {
                if(news._id === arrayIds[i]){
                    this.deletePostVK(news);
                } 
            });            
        };
    };
    findNews = (title) => {
        if(!title) {
                axios({
                    url:`${server}/api/news?isAdmin=true`,
                    method:'get',
                    mode:'cors'
                })
                .then(res => this.setState({filteredNews: res.data.news}))
                .catch(error => this.setState({error}))
        } else {
            const {news} = this.state
            this.setState({
                filteredNews: news.filter((item) => {
                    return item.title.toLowerCase().includes(title)
                })
            })
        }
    };
}

export default AdminNewsContent;