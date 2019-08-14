import React, {Component} from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import axios from 'axios';

import customRendererFn from '../Admin/AdminComponents/AdminEditor/Renderer';
import '../News/News.css';
import {server} from '../../../src/api';
import Menu from '../Menu/Menu';
import '../FullNews/FullNews.css';
import Footer from '../Footer/Footer';

class FullNews extends Component {
    state = {
        news: {}
    }
    componentDidMount(){
        this.getInfoAboutNews()
    }
    render() {
        return (
            <div className = 'client-news'>
                <div className = 'full-news-container'>
                    <Menu name = 'full-news-menu'/>
                    <div className = 'aside-and-text-full-news'>
                        <div className = 'aside-full-news'>
                            <p><NavLink to = '/news'> Новости </NavLink></p>    
                        </div>
                        <div className = 'full-news-list-container'>
                        {(this.state.news)? (<div className = 'full-news'>
                            {this.state.news.image ? 
                                <img src = {'http://localhost:3001/images/' + this.state.news.image} alt = 'image for news' /> :
                                null}
                            <p className = 'full-news-date'>{moment(this.state.news.createdAt).format('DD MMMM YYYY')} </p>
                            <p className = 'full-news-title'> {this.state.news.title}</p>                           
                            {this.state.news.fullText ?         
                                <Editor 
                                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.news.fullText)))} 
                                    readOnly={true} 
                                    blockRendererFn={customRendererFn}
                                /> :
                                null 
                            }
                        </div>): null }
                        </div>
                    </div>
                    <Footer name = 'full-news-footer'/>
                </div>
            </div>
        ) 
    }
    getInfoAboutNews = () => {
        const id = this.props.match.params.id;

        axios.get(`${server}/api/news/`+id)
        .then(response => {
            this.setState({
                news: response.data.news
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export default FullNews;
