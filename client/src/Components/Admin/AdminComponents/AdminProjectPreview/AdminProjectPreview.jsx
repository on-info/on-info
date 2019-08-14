import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import {Editor} from 'draft-js';
import customRendererFn from '../AdminEditor/Renderer';

import Button from '../../../Button/Button';
import {server} from '../../../../api';
import './AdminProjectPreview.css';
import '../../../../Pages/Projects/Projects.css'
import ProjectGallery from '../../../ProjectGallery/ProjectGallery';
import ProjectDefaultImg from '../../../../Assets/AssetsSvg/project-default.svg';

class AdminProjectPreview extends Component {
    render() {
        return (
            <div className = 'admin-preview-project'>
                <div className="projects-page-content">
                <div className="img-container">
                    <div className="img-placeholder">
                         <img className="project-main-img" src={this.props.image ? `http://localhost:3001/images/${this.props.image}` : ProjectDefaultImg }/>
                    </div>
                </div>
                    <div className="project-section">
                        <div className="full-text-card">
                            <div className="text-container">
                                <div className="project-title">
                                    <h3>{this.props.name}</h3>
                                </div>
                                <div className="project-address">{this.props.address}</div>
                                <div className="project-desc">
                                    <Editor 
                                        editorState={this.props.fullTextEditorState} 
                                        readOnly={true} 
                                        blockRendererFn={customRendererFn}
                                    />
                                </div>
                            </div>
                            {<ProjectGallery content={this.props} />}
                            <div className="contact-info">
                            <p>Контакты:</p>
                            <p>{this.props.organization}</p>
                            <p>{this.props.headArray.map((item, i) => {
                                    return <span key={i}>{item + " "}</span>     
                                    })
                                }, {this.props.contactsArray.map((item, i) => {
                                    return <span className="contact-phone" key={i}>{item + " "}</span>     
                                    })
                                }</p>
                            <a className="contact-link" href={this.props.site} target="_blank">{this.props.site}</a>
                        </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="admin-buttons">
                        <Route render={({history}) => (
                            <Button 
                                label={"Опубликовать"}
                                name = "button-admin"
                                clickHandler = {this.props.onPublish}
                            />
                        )} />
                        <Route render={({history}) => (
                            <Button 
                                label={"Сохранить"}
                                name = "button-admin"
                                clickHandler = {this.props.onDraft}
                            />
                        )} />
                        <Route render={({history}) => (
                            <Button 
                                label={"Отмена"}
                                name = "button-admin"
                                clickHandler = {this.onCancelPreview}
                            />
                        )} />
                    </div>
            </div>
            
        )
    }
    
    onCancelPreview = (e) => {
        e.preventDefault()
        this.props.getNewStatePreview()
    }
}

export default withRouter(AdminProjectPreview);