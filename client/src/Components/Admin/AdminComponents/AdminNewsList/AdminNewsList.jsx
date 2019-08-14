import React, {Component} from 'react';
import AdminNews from '../AdminNews/AdminNews';
import './AdminNewsList.css';
import { server } from '../../../../api';
import {withRouter} from "react-router-dom";
import axios from 'axios';
class AdminNewsList extends Component {
        state = {
            showNews: false,
            newsInfo: ''
        }
    render() {
        return (
            <div className="news-list-admin">
                <div className="news-list-header">
                    <div>Название новости</div>
                    <div>Дата создания</div>
                    <div>Опубликовано</div>
                    <div>Удалить новость</div>
                    <div>Статус</div>
                </div>
                <div>                    
                    {this.props.news.map(item => 
                        <AdminNews 
                            news = {item} 
                            key = {item._id}  
                            deleteHandler = {() => this.props.deleteNews(item)} 
                            showNews= {this.getInfoNews}
                            checkId = {this.props.checkId}
                        />
                    )}
                </div>  
            </div>  
        )
    }
    getInfoNews = (id) => {
        axios({
            url:`${ server }/api/news/${id}`
        })
        .then(res => {
            this.setState({ newsInfo: res.data.news });
            this.props.history.push({
                pathname: '/admin-panel/news/create',
                state: { detail: this.state.newsInfo}
            })
        })
    }
}

export default withRouter(AdminNewsList);
