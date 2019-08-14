import React, { Component } from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import moment from 'moment';
import customRendererFn from '../Admin/AdminComponents/AdminEditor/Renderer';
import ProjectGallery from '../../Components/ProjectGallery/ProjectGallery';
import ProjectDefaultImg from '../../Assets/AssetsSvg/project-default.svg';


class Project extends Component {

    render() {
        return (
            <div className="projects-page-content">
                <div className="img-container">
                    <div className="img-placeholder">
                         <img className="project-main-img" src={this.props.content.image ? `http://localhost:3001/images/${this.props.content.image}` : ProjectDefaultImg }/>
                    </div>
                </div>
                <div className="project-section">
                    <div>
                        <div className="text-container">
                            <div className="project-title">
                                <h3>{this.props.content.name}</h3>
                            </div>
                            <div className="project-address">{this.props.content.address}</div>
                            <div className="project-desc">
                                {this.props.content.fullText ?        
                                    <Editor 
                                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content.fullText)))} 
                                        readOnly={true} 
                                        blockRendererFn={customRendererFn}
                                    /> :
                                    null 
                                }
                            </div>
                        </div>
                        {<ProjectGallery content={this.props.content} />}    
                        <div className="contact-info">
                            <p>Контакты:</p>
                            <p>{this.props.content.organization}</p>
                            <p>{this.props.content.headArray.map((item, i) => {
                                    return <span key={i}>{item + " "}</span>     
                                    })
                                }, {this.props.content.contactsArray.map((item, i) => {
                                    return <span className="contact-phone" key={i}>{item + " "}</span>     
                                    })
                                }</p>
                            <a className="contact-link" href={this.props.content.site} target="_blank">{this.props.content.site}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Project;
