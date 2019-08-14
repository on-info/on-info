import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import FullNews from '../FullNews/FullNews';
import EventModal from '../EventModal/EventModal';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

import customRendererFn from '../Admin/AdminComponents/AdminEditor/Renderer';

class News extends Component {
    state = {
        isOpen: false
    };
    componentDidMount(){
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isOpen: false
            });
        });
    };
    getEventWindow = () => {
        this.setState({isOpen:true});
    };
    closeModalWindow = (e) => {
        if(e.target.className === 'overlay' 
        ||e.target.classList.contains('button-event-close' )
        ||e.target.classList.contains('button-close' )){
            e.stopPropagation();
            this.setState({isOpen:false});
        };        
    };
    render() {
        moment.lang('ru');
        return (
            <div id = {this.props.id} className = 'news' onClick = {this.Click}>
                {(!this.props.event)?(
                        <NavLink to={`/news/${this.props.id}`} >
                            <p className = 'news-date'>
                                {moment(this.props.date).format('DD MMMM YYYY')} 
                            </p>
                            {this.props.img?
                                <img 
                                    src = {`http://localhost:3001/images/${this.props.img}`} 
                                    alt = 'image for news' />: 
                                null}
                            <p className = 'news-title'>
                                {this.props.name} 
                            </p>
                            <span 
                                className = 'news-text' 
                                dangerouslySetInnerHTML={{__html: this.props.text}}
                            />                
                        </NavLink>):(
                        <div onClick = {this.getEventWindow} className = 'wrapper-event'>
                            <p className = 'news-date'>
                                {moment(this.props.event.dateStart).format('DD MMMM YYYY')} 
                            </p>
                            <p className = 'news-title'>
                                {this.props.event.title} 
                            </p>
                            <div className = 'news-text' >
                                {this.props.event.text ?         
                                    <Editor 
                                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.event.text)))} 
                                        readOnly={true} 
                                        blockRendererFn={customRendererFn}
                                    /> :
                                    null 
                            }
                        </div>
                            <div 
                                className={this.state.isOpen ? 'overlay' : 'overlay hidden'} 
                                onClick = {this.closeModalWindow}
                            >
                                <div className="modal-event-field">
                                   <EventModal 
                                        event = {this.props.event} 
                                        closeModalWindow = {this.closeModalWindow}
                                    />
                                </div>
                            </div>   
                        </div>
                 )}
            </div>
        ) 
    }
}

export default News;