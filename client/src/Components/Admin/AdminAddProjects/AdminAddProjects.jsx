import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {ToastDanger} from 'react-toastr-basic'

import TextField from '../../TextField/TextField';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import ControlledEditor from  "../AdminComponents/AdminEditor/AdminEditor";
import Button from '../../Button/Button';
import AdminProjectPreview from '../AdminComponents/AdminProjectPreview/AdminProjectPreview'
import AdminSelectSearch from '../../Admin/AdminComponents/AdminSelectSearch/AdminSelectSearch';
import AdminValidationWindow from '../AdminComponents/AdminValidationWindow/AdminValidationWindow';


import './AdminAddProjects.css';
import { server } from "../../../api";

class AdminAddProjects extends Component {
    state = {
        imageData: '',
        image:'',
        name: '',
        organization:'',
        head:'',
        headArray:[],

        contacts:'',
        contactsArray:[],
        
        address:'',
        site:'',
        
        mediaImageArray:[],
        mediaImageData:'',
        mediaImage:'',

        mediaVideoArray:[],
        mediaVideo:'',
        
        fullTextEditorState: EditorState.createEmpty(),
        filter: '',
        isPublic:false,
        isPreview:false,
        isRight:false,
        value:1000,
        
        isName:true,
        isSiteCorrect:true,
        isMediaVideoArray:true,
        isFullTextCorrectValue:true,
    }
    cropperRef = React.createRef()

    componentDidMount() {
        this.getFiltersListByType('projects');
        if (this.props.location.state) {
            let fullTextEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.location.state.detail.fullText)));
            this.setState({
                image: this.props.location.state.detail.image,
                name: this.props.location.state.detail.name,
                organization: this.props.location.state.detail.organization,
                headArray: this.props.location.state.detail.headArray,
                contactsArray: this.props.location.state.detail.contactsArray,
                address: this.props.location.state.detail.address,
                site: this.props.location.state.detail.site,
                mediaImageArray: this.props.location.state.detail.mediaImageArray,
                mediaVideoArray: this.props.location.state.detail.mediaVideoArray,
                fullTextEditorState: fullTextEditorState,
                filter: this.props.location.state.detail.filter,
                isPublic: this.props.location.state.detail.isPublic
            })
        }
    }
    getFiltersListByType = (type) => {
        axios({
            method: 'get',
            url: `${ server }/api/filters?type=${type}`

        })
        .then(res =>{
            this.setState({
                filters:res.data.filterList,
            })
        })     
    }
    showToast(e){
        ToastDanger(e);
    }
    render() {
        let newValue = draftToHtml(convertToRaw(this.state.fullTextEditorState.getCurrentContent())).replace(/<[^>]*>/g, '').replace(/\r\n/g, '').length;
        return (
            <div className="admin-content"> 
            <Navigation onLogout={this.onLogout}/>
            <NavBar />
            {!this.state.isPreview ? 
            <div className="list-container">
                <div className = "projects-status">
                    <span>Статус проекта: {this.state.isPublic ? " опубликована" : " черновик"}</span>
                    <Route render={({history}) => (
                        <Button 
                            label={this.state.isPublic ? 'Сохранить черновик':'Опубликовать' }
                            name = "button-admin"
                            clickHandler = {this.onChangeStatus}
                        />
                    )} />
                </div>
                <hr />
                <div>
                    <AdminUploadImage 
                        id = "image-projects"
                        name = "image-projects"
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        onCropImage = {this.onCropImage}
                        deleteImage = {this.deleteImage}
                    />
                </div>
                <hr />
                <div className='admin-projects-text-container'>
                    <div className="admin-name-projects">
                        <TextField
                            id = "name-projects" 
                            label = "Название проекта:"
                            type = "text"
                            name = "name-projects"
                            value = {this.state.name}
                            onChangeValue = {this.getValue}
                        />
                        {!this.state.isName ?
                        <AdminValidationWindow
                            title='Название проекта необходимо заполнить'
                            showToast = {this.showToast.bind(this)}
                        />
                        :null} 
                    </div>
                    <hr />
                    <div className="admin-organization-projects">
                        <TextField 
                            id = "organization-projects" 
                            label = "Организация:"
                            type = "text"
                            name = "organization-projects"
                            value = {this.state.organization}
                            onChangeValue = {this.getOrganization}
                        />
                    </div>
                    <hr />
                    <div className="admin-head-projects">
                        <div className='add-info-projects'>
                        <TextField 
                            required
                            id = "head-projects" 
                            label = "Руководитель проекта:"
                            type = "text"
                            name = "head-projects"
                            value = {this.state.head}
                            onChangeValue = {this.getHead}
                        />
                        <Button
                            label = {"Добавить организатора"}
                            clickHandler = {this.addHead}
                            name = {"admin-button admin-projects-media-buttons"}
                        />
                        </div>
                        {this.state.headArray ?
                            <ul className="video-array">
                                { this.state.headArray.map( (link,index) =>
                                    <li className="projects-video-container" key = { index }>
                                        <span> { link.name } </span>
                                        <Button 
                                            name = "button-admin admin-cancel"
                                            label = {<span aria-hidden="true">&times;</span>}
                                            clickHandler = {(event) => this.deleteHead(event, index)}
                                        />
                                    </li>
                                )}
                            </ul>
                        :null}
                    </div>
                    <hr />
                    <div className="admin-contacts-projects">
                        <div className='add-info-projects'>
                        <div className="container-for-input">
                        <label>Телефон:</label>
                        <InputMask 
                            mask="+375 (99) 999-99-99" 
                            value = {this.state.contacts} 
                            onChange={this.getContacts}
                        />
                        </div>
                        <Button
                            label = {"Добавить телефон"}
                            clickHandler = {this.addContacts}
                            name = {"admin-button admin-projects-media-buttons"}
                        />
                        </div>
                        {this.state.contactsArray ?
                            <ul className="video-array">
                                { this.state.contactsArray.map( (link,index) =>
                                    <li className="projects-video-container" key = { index }>
                                        <span> { link.name } </span>
                                        <Button 
                                            name = "button-admin admin-cancel"
                                            label = {<span aria-hidden="true">&times;</span>}
                                            clickHandler = {(event) => this.deleteContact(event, index)}
                                        />
                                    </li>
                                )}
                            </ul>
                        :null}
                    </div>
                    <div className="admin-address-projects">
                        <TextField 
                            required
                            id = "address-projects" 
                            label = "Адрес:"
                            type = "text"
                            name = "address-projects"
                            value = {this.state.address}
                            onChangeValue = {this.getAddress}
                        />
                    </div>
                    <div className="admin-site-projects">
                        <TextField
                            id = "site-projects" 
                            label = "Сайт:"
                            type = "text"
                            name = "site-projects"
                            value = {this.state.site}
                            onChangeValue = {this.getSite}
                        />
                        { !this.state.isSiteCorrect?
                            <AdminValidationWindow
                                title ='Введите корректный сайт!'
                                showToast = {this.showToast.bind(this)}
                            />
                        :null}
                    </div>
                    <hr />
                    <div className="admin-media-projects">
                        <div className="admin-image">
                            <label>Изображение:</label>
                            <div className = {this.isCorrectArrayLimit()?"admin-button":"button-projects-dislable"}>
                                    <div className = "choose-file">
                                        <span>Выберите файл</span>
                                    </div>
                                    <input
                                        id="image-projects"
                                        name="image-projects"
                                        type  = "file"
                                        onChange = {this.onChangeFile}
                                        multiple
                                    />
                            </div>
                            {this.state.mediaImageArray?
                            <div className="image-array">
                               {this.state.mediaImageArray.map( (link,index) =>
                                    <div className="projects-gallery-container" key={index}>
                                        <img src = { link.name } className="projects-media-gallery" alt=""/>
                                        <Button 
                                            name = {"button-admin admin-cancel"}
                                            label = {<span aria-hidden="true">&times;</span>}
                                            clickHandler = {(event) => this.deleteGalleryImage(event, index)}
                                        />
                                    </div>
                                )}
                            </div>
                            :null}
                        </div>
                        <div className="admin-media-video-projects">
                            <div className="input-video-container">
                                <div className='add-info-projects'>
                                <TextField
                                onKeyPress = {this.onKeyPress}
                                id = "video-projects" 
                                label = "Видео:"
                                type = "text"
                                name = "video-projects"
                                value = {this.state.mediaVideo}
                                onChangeValue = {this.getVideo}
                            />
                            <Button
                                label = {"Добавить видео"}
                                clickHandler = {this.addMediaVideo}
                                name = {this.isCorrectArrayLimit()?"admin-button admin-projects-media-buttons":"button-projects-dislable"}
                            />
                            </div>
                            {!this.state.isMediaVideoArray ?
                                <AdminValidationWindow
                                    title='Неправильно введена ссылка!'
                                    showToast = {this.showToast.bind(this)}
                                />
                            :null}
                            {this.state.mediaVideoArray?
                                <ul className="video-array">
                                    { this.state.mediaVideoArray.map( (link,index) =>
                                        <li className="projects-video-container" key = { index }>
                                            <span> { link.name } </span>
                                            <Button 
                                                name = "button-admin admin-cancel"
                                                label = {<span aria-hidden="true">&times;</span>}
                                                clickHandler = {(event) => this.deleteGalleryVideo(event, index)}
                                            />
                                        </li>
                                    )}
                                </ul>
                                :null}
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="text-projects">
                    <div className="full-text-projects">Описание проекта:</div>
                    <div className="projects-textfield">
                        <ControlledEditor 
                            initialEditorState = {this.state.fullTextEditorState} 
                            onEditorStateChange = {this.onEditorStateChange}
                            getDeletedImages = {this.getDeletedImages}
                            isProject = {true}
                        />
                    {!this.state.isFullTextCorrectValue ?
                        <AdminValidationWindow 
                            title='Количество символов превышает 1000!'
                            showToast = {this.showToast.bind(this)}
                        />
                    : null}
                    <div className = "admin-textarea-description">
                        <span>Краткое описание не должно содержать более 1000 символов</span>
                        <div>
                            <span>Количество оставшихся символов: </span>
                            <span readOnly className = "admin-textarea-symbols">{this.state.value - newValue}</span>
                        </div>
                    </div>
                    </div>
                </div>
                <hr />
                <div className="text-projects">
                    <div>
                        {this.state.filters? 
                            <AdminSelectSearch 
                                value = {this.state.filter}
                                filtersList = {this.state.filters}
                                getFilter = {this.getFilter}
                            />
                        :null}
                    </div>
                </div>
                <hr />
                <div className="admin-buttons">
                    <Route render={({history}) => (
                        <Button 
                            label = {"Предпросмотр"} 
                            name = {"button-admin"}
                            clickHandler = {this.onPreview}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button
                            label={"Опубликовать"}
                            name = {
                                "button-admin"
                            }
                            clickHandler = {this.onPublish}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button 
                            label={"Сохранить как черновик"}
                            name = {"button-admin"}
                            clickHandler = {this.onDraft}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button 
                            label={"Назад"}
                            name = "button-admin"
                            clickHandler = {this.onCancel}
                        />
                    )} />
                </div>
            </div> :
            <AdminProjectPreview 
            imageData = {this.state.imageData}
            image = {this.state.image}
            name = {this.state.name}
            organization = {this.state.organization}
            headArray = {this.state.headArray}
            contactsArray = {this.state.contactsArray}
            address = {this.state.address}
            site = {this.state.site}
            mediaImageArray = {this.state.mediaImageArray}
            mediaVideoArray = {this.state.mediaVideoArray}
            fullTextEditorState = {this.state.fullTextEditorState}
            onPublish = {this.onPublish}
            onDraft = {this.onDraft}
            getNewStatePreview = {this.getNewStatePreview}
            />
            } 
            </div>
        )
        
    }
    getValue = (str) => {
        this.setState({name: str});
    }
    getOrganization = (str) =>{
        this.setState({organization:str})
    }
    getHead = (str) =>{
        this.setState({head:str})
    }
    addHead = (e)=>{
        e.preventDefault()
        let object={}
        let headArray = this.state.headArray
        if(this.state.head){
            object.name=this.state.head
            headArray.push(object)
            this.setState({
                headArray:headArray
            })
            this.setState({
                head:''
            })
        }
    }
    deleteHead = (e,index) => {
        let headArray = this.state.headArray
        let deletedHead = headArray.splice(index, 1)
        this.setState({
            headArray: headArray
        })
    }
    getContacts = (e) =>{
        this.setState({contacts:e.target.value})
    }
    addContacts = (e) => {
        e.preventDefault()
        let object={}
        let contactsArray = this.state.contactsArray
        if(this.state.contacts && /^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/.test(this.state.contacts) ) {
            object.name=this.state.contacts
            contactsArray.push(object)
            this.setState({
                contactsArray:contactsArray
            })
            this.setState({
                contacts:''
            })
        }
    }
    deleteContact = (e,index) =>{
        e.preventDefault()
        let contactsArray = this.state.contactsArray
        let deletedContacts = contactsArray.splice(index, 1)
        this.setState({
            contactsArray: contactsArray
        })
    }
    getAddress = (str) =>{
        this.setState({address:str})
    }
    getSite = (str) =>{
        this.setState({site:str})
    }
    addMediaImage = () => {
        let object = {}
        let mediaImageArray = this.state.mediaImageArray
        let formData = new FormData();
        if(this.isCorrectArrayLimit()){
            formData.append('imageData',this.state.mediaImageData);
            axios({
                method:'post',
                url: `${server}/api/uploadGalleryImage/`,
                data:formData,
                config:{
                    headers:{
                        'Content-Type':'multipart/form-data; charset=UTF-8'
                    }
                }
            })
            .then(res =>{
                object.name = res.data.link
                mediaImageArray.push(object)
                this.setState({
                    mediaImageArray:mediaImageArray
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    deleteGalleryImage = (e, index) => {  
        e.preventDefault()
        let mediaImageArray = this.state.mediaImageArray
        let deletedImage = mediaImageArray.splice(index, 1)
        axios({
             method: 'delete',
             url: `${server}/api/uploadGalleryImage/`,
             data: deletedImage,
             config: {
                 headers: {
                     'Content-Type': 'application/json; charset=UTF-8'
                    } 
                },
         })
         .catch(err=> {
             console.log(err);
         });
        this.setState({
            mediaImageArray: mediaImageArray
        })      
     }
    getVideo = (str) =>{
        this.setState({mediaVideo:str})
    }
    addMediaVideo = (e) =>{
        e.preventDefault()
        let object = {}
        let mediaVideoArray = this.state.mediaVideoArray
        if(this.state.mediaVideo && /^(https?:\/\/)?([\da-zа-я\.-]+)\.([a-zа-я\.]{2,6})\/([\w\/\-\.]+)([\?].*)?$/igm.test(this.state.mediaVideo) && this.isCorrectArrayLimit()) {
            object.name = this.state.mediaVideo
            mediaVideoArray.push(object)
            this.setState({
                mediaVideoArray:mediaVideoArray,
                mediaVideo:'',
                isMediaVideoArray:true
            })
            
        }else{
            this.setState({
                isMediaVideoArray:false
            })
        } 
    }
    onKeyPress  = (e) => {
        (e.charCode === 13 && this.isCorrectArrayLimit())? this.addMediaVideo(e): null;
    }
    deleteGalleryVideo = (e,index)=>{
        e.preventDefault()
        let mediaVideoArray = this.state.mediaVideoArray
        let deletedVideo = mediaVideoArray.splice(index, 1)
        this.setState({
            mediaVideoArray: mediaVideoArray
        })
    }
    isCorrectArrayLimit = () => {
        return this.state.mediaImageArray.length + this.state.mediaVideoArray.length < 4
    }
    onEditorStateChange = (editorState) => {
        this.setState({fullTextEditorState: editorState});
    }
    getFilter = (str) => {
        {str.length > 0 ? this.setState({filter : str}): null };
    }
    onCropImage = (image) => {
        this.setState({imageData: image})
    }
    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        })
    }
    onCorrectTitle = () =>{
        if(/^[\w\W\s]+$/.test(this.state.name)){
            this.setState({
                isName:true
            })
            return true;
        }else{
            this.setState({
                isName:false
            })
            return false; 
        }
    }
    onCorrectSite = () =>{
        if(/^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\W\.-]*)*\/?)?$/.test(this.state.site)){
            this.setState({
                isSiteCorrect:true
            })
            return true;
        }else{
            this.setState({
                isSiteCorrect:false
            })
            return false;
        }
    }
    onChangeStatus = () =>{
        this.setState({isPublic:!this.state.isPublic})
    }
    onCorrectFullText = () =>{
        let fullText = draftToHtml(convertToRaw(this.state.fullTextEditorState.getCurrentContent()))
        let newText = fullText.replace(/<[^>]*>/g, '').replace(/\r\n/g, '')
        if(newText.length<=this.state.value){
            this.setState({
                isFullTextCorrectValue:true
            })
            return true;
        }else{
            this.setState({
                isFullTextCorrectValue:false
            })
            return false;
        }
    }
    onPublish = (e) => {
        if(this.onCorrectTitle() && this.onCorrectSite() && this.onCorrectFullText()){
            this.setState({
                isPublic: true
            }, this.sendProjects)
        }
    }
    onDraft = (e) => {
        e.preventDefault()
        if(this.onCorrectTitle() && this.onCorrectSite() && this.onCorrectFullText()){
            this.setState({
                isPublic: false
            }, this.sendProjects)
        }
    }
    onPreview = (e)=>{
        e.preventDefault()
        if(this.onCorrectTitle() && this.onCorrectSite() && this.onCorrectFullText()){
            this.setState({
                isPreview:true
            })
        }
    }
    onCancel = (e) => {
        e.preventDefault()
        this.setState({
            imageData: '',
            image: '',
            name: '',
            organization:'',
            head:'',
            contacts:'',
            address:'',
            site:'',
            video:'',
            fullTextEditorState: EditorState.createEmpty(),
            filter:'',
            isPublic: false,
        }) 
        this.props.history.push({
            pathname: '/admin-panel/projects'
        })  
    }
    sendProjects = () =>{
        let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));
        formData.append('fullText', JSON.stringify(convertToRaw(this.state.fullTextEditorState.getCurrentContent())))
        formData.set('headArray',JSON.stringify(this.state.headArray))
        formData.set('contactsArray',JSON.stringify(this.state.contactsArray))
        formData.set('mediaImageArray',JSON.stringify(this.state.mediaImageArray))
        formData.set('mediaVideoArray',JSON.stringify(this.state.mediaVideoArray))

        let id = ''
        if (this.props.location.state) {
            id = this.props.location.state.detail._id
        }
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/api/projects/${id}` : `${server}/api/projects/`,
            data: formData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8'
                }
            },
        })
        .then(response=>{
            this.setState({
                imageData: '',
                image: '',
                name: '',
                organization:'',
                head:'',
                contacts:'',
                address:'',
                site:'',
                video:'',
                fullTextEditorState: EditorState.createEmpty(),
                filter:'',
                isPublic: false,
                mediaImageArray: []
            }) 
            this.props.history.push({
                pathname: '/admin-panel/projects'
            })  
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    deleteImage = () => {
        this.setState({
            imageData: '',
            image: ''
        })   
    }
    onChangeFile = (e) => {
        let type = /^image\//
        for (let i = 0; i<4; i++) {
            let reader = new FileReader(),
                file = e.target.files[i]
            if(!file || !type.test(file.type)){
                return
            }
            reader.onload = (item) => {
                this.setState({
                    mediaImageData:item.target.result
                },this.addMediaImage)
            }
            reader.readAsDataURL(file)
        }
        e.target.value=null;
    } 
}
export default withRouter(AdminAddProjects);