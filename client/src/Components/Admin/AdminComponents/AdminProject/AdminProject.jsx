import React, {Component} from 'react';
import Button from '../../../Button/Button';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';
import './AdminProject.css';
import axios from 'axios';
import {server} from '../../../../api';


class AdminProject extends Component {
    state = {
        id: ''
    }
    componentDidMount (){
        this.setState({
            id:this.props.projects._id,
            image:this.props.projects.image,
            isPublic:this.props.projects.isPublic,
            name:this.props.projects.name,
            organization:this.props.projects.organization,
            headArray:this.props.projects.headArray,
            contactsArray:this.props.projects.contactsArray,
            address:this.props.projects.address,
            site:this.props.projects.site,
            mediaVideoArray:this.props.projects.mediaVideoArray,
            mediaImagesArray:this.props.projects.mediaImagesArray,
            fullText:this.props.projects.fullText,
            filter: this.props.projects.filter,
            createAt:this.props.projects.createAt
        })
    }
   render() {
       return (
           <div className="projects-admin"  id = {this.state.id} >
                <div className = "projects-admin-checkbox">
                    <input 
                        type = "checkbox" 
                        name = "checkbox-id" 
                        onChange = {this.checkId}
                    />
                    <div onClick = {this.showProjects} className="projects-admin-title">{this.state.name}</div>
               </div>
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
                        name = {this.state.isPublic ? 'button-publish-projects':'button-not-publish-projects'}
                        label = {this.state.isPublic ? 'Отменить публикацию':'Опубликовать'}
                        clickHandler = {this.handleClick}
                    />
                </div>
           </div>
       )
   }
   checkId = () => {
        this.props.checkId(this.state.id)
    }
    showProjects = () => {
        this.props.showProjects(this.state.id)
    }
    handleClick = () => {
        this.setState({isPublic: !this.state.isPublic}, this.publishProjects)
    }
    publishProjects = (e) => {
        axios({
                method: 'put',
                url: `${server}/api/projects/${this.state.id}`,
                data: {'isPublic':this.state.isPublic},
                config: {
                    headers: {
                        Accept:'application/json',
                        'Content-Type': 'multipart/form-data; charset=UTF-8'
                    }},
            })
              .catch(function (error) {
                console.log(error);
              });
    }
    submit = () =>{
       confirmAlert({
           title:'Подтвердите удаление проекта',
           message: 'Вы точно хотите удалить проект?',
           buttons:[
               {
                   label: 'Да',
                   onClick: (item)=>this.props.deleteHandler(item)
               },
               {
                   label: 'Нет',
                   onClick: ()=>{}
               }
           ]
       })
   }
}

export default AdminProject;