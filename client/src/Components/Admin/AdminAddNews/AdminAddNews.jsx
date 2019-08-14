import React, {Component} from 'react';
import {Route,withRouter} from 'react-router-dom';
import axios from 'axios';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {ToastDanger} from 'react-toastr-basic';

import {server} from '../../../api';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import TextField from '../../TextField/TextField';
import ControlledEditor from  '../AdminComponents/AdminEditor/AdminEditor';
import Button from '../../Button/Button';
import Navigation from '../../Navigation/Navigation';
import NavBar from '../../NavBar/NavBar';
import AdminPreview from '../AdminComponents/AdminPreview/AdminPreview';
import AdminSelectSearch from '../../Admin/AdminComponents/AdminSelectSearch/AdminSelectSearch';
import jsonpAdapter from 'axios-jsonp';
import './AdminAddNews.css';
import AdminValidationWindow from '../AdminComponents/AdminValidationWindow/AdminValidationWindow';

class AdminAddNews extends Component {
    state = {
        title: '',
        shortText: '',
        fullTextEditorState: EditorState.createEmpty(),
        filter: '',
        isPublic: false,
        imageData: '',
        isPreview: false,
        image: '',
        date: '',
        value: 0,
        deletedImages: [],
        idVK: '', 
        socialNetworksModal: false,
        idVK:'',
        isTitle: true,
        isFullTextCorrect: true
    }
    cropperRef = React.createRef();

    componentWillMount() {
        this.getFiltersListByType('news');
        if (this.props.location.state) {
            let fullTextEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.location.state.detail.fullText)));
            this.setState({
                title: this.props.location.state.detail.title,
                shortText: this.props.location.state.detail.shortText,
                fullTextEditorState: fullTextEditorState,
                isPublic: this.props.location.state.detail.isPublic,
                image: this.props.location.state.detail.image,
                filter: this.props.location.state.detail.filter,
                date: this.props.location.state.detail.createdAt,
                value: this.props.location.state.detail.shortText.length,
                idVK : this.props.location.state.detail.idVK
            })
        }
    }
    showToast(e){
        ToastDanger(e);
    }
    render() {
        return (
            <div className="admin-content">
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                {!this.state.isPreview ? 
                    <div className = "create-news">
                        <div className = "news-status">
                            <span>Статус новости: {this.state.isPublic ? " опубликована" : " черновик"}</span>
                            <Route render={({history}) => (
                                <Button 
                                    label={this.state.isPublic ? "Отменить публикацию" : "Опубликовать"}
                                    name = "button-admin"
                                    clickHandler = {this.onSaveChangeStatus}
                                />
                            )} />
                        </div>
                        <div className="admin-title-news">
                            <TextField 
                                label = "Название новости:"
                                id = "title-news" 
                                type = "text"
                                name = "title-news"
                                value = {this.state.title}
                                onChangeValue = {this.onChangeValue}
                            />
                            {!this.state.isTitle ?
                                <AdminValidationWindow
                                    title='Название новости необходимо заполнить'
                                    showToast = {this.showToast.bind(this)}
                                />
                            :null} 
                        </div>
                        <hr />
                        <div>
                            <AdminUploadImage 
                                id = "image-news"
                                name = "image-news"
                                imageData = {this.state.imageData}
                                image = {this.state.image}
                                onCropImage = {this.onCropImage}
                                ratio = {8 /3}
                                deleteImage = {this.deleteImage}
                            />
                        </div>
                        <hr />
                        <div className="text-news">
                            <div>Краткое описание:</div>
                            <div className = "admin-textarea">
                                <textarea 
                                    rows = "5"
                                    value = {this.state.shortText}
                                    onChange = {this.getCurrentTextShort}
                                    maxLength = "300"
                                ></textarea>
                                <div className = "admin-textarea-description">
                                    <span>Краткое описание не должно содержать более 300 символов</span>
                                    <div>
                                        <span>Количество оставшихся символов: </span>
                                        <span readOnly className = "admin-textarea-symbols">{300 - this.state.value}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="text-news">
                            <div className="full-text-news">Полное описание:</div>
                            <ControlledEditor 
                                initialEditorState = {this.state.fullTextEditorState} 
                                onEditorStateChange = {this.onEditorStateChange}
                                getDeletedImages = {this.getDeletedImages}
                            />
                            {!this.state.isFullTextCorrect ?
                            <AdminValidationWindow
                                title='Название Полного описания необходимо заполнить'
                                showToast = {this.showToast.bind(this)}
                            />
                            :null} 
                        </div>
                        <hr />
                        <div className="text-news">
                            {this.state.filters ? 
                                <AdminSelectSearch 
                                    value = {this.state.filter}
                                    filtersList = {this.state.filters}
                                    getFilter = {this.getFilter}
                                />:
                                null
                            }
                        </div>
                        <div className="admin-buttons">
                            <Route render={({history}) => (
                                <Button 
                                    label = {"Предпросмотр"} 
                                    name = "button-admin"
                                    clickHandler = {this.onPreview}
                                />
                            )} />
                            <Route render={({history}) => (
                                <Button 
                                    label={this.state.isPublic ? "Отменить публикацию" : "Опубликовать"}
                                    name = "button-admin"
                                    clickHandler = {this.onSaveChangeStatus}
                                />
                            )} />
                            <Route render={({history}) => (
                                <Button 
                                    label={this.state.isPublic ? "Сохранить" : "Сохранить без публикации"}
                                    name = "button-admin"
                                    clickHandler = {this.checkText}
                                />
                            )} />
                            <Route render={({history}) => (
                                <Button 
                                    label={"Отмена"}
                                    name = "button-admin"
                                    clickHandler = {this.onCancel}
                                />
                            )} />
                        </div>
                        <div 
                            className = {(this.state.socialNetworksModal && !this.props.location.state) ? 'overlay' : 'overlay hidden'} 
                        >
                            <div className = "modal-event-field modal-social-event">
                                <div>
                                    <p>Поделиться в социальных сетях?</p>
                                    <ul className = 'social-networks-event-modal' onClick = {this.getActiveSocialNetworks}>
                                        <li className = 'vkontakte-social-network'></li>
                                        <li className = 'facebook-social-network'></li>
                                    </ul>
                                </div>
                                <div className = 'button-wrapper-event-modal'>
                                <Button 
                                    name = "button-admin button-admin-background" 
                                    label = 'Поделиться' 
                                    clickHandler = {this.publish}
                                />
                                <Button 
                                    name = "button-admin button-admin-background" 
                                    label = 'Нет, спасибо' 
                                    clickHandler = {this.closeModalWindow}
                                />
                                </div>
                            </div>
                        </div> 
                    </div> : 
                    <AdminPreview 
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        title = {this.state.title}
                        fullTextEditorState = {this.state.fullTextEditorState}
                        onSaveChangeStatus = {this.onSaveChangeStatus}
                        deleteImages = {this.deleteImages}
                        getNewStatePreview = {this.getNewStatePreview}
                        date = {this.state.date}
                        isPublic = {this.state.isPublic}
                    />                    
                }
            </div>
        )
    }
    onCropImage = (image) => {
        this.setState({imageData: image});
    };

    onChangeValue = (str) => {
        this.setState({title: str});
    };

    onEditorStateChange = (editorState) => {
        this.setState({fullTextEditorState: editorState});
    };

    getDeletedImages =  (deletedImages) => {
        this.setState({deletedImages: deletedImages})
    };

    getCurrentTextShort = (event) => {
        this.setState({
            shortText: event.target.value,
            value: event.target.value.length
        });
    };

    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        });
    };

    getFilter = (str) => {
        str.length > 0 ? 
            this.setState({filter: str}):
            null
    };

    checkText = () => {
        if (this.state.fullTextEditorState) {
            if (!this.state.shortText) {
                let fullText = draftToHtml(convertToRaw(this.state.fullTextEditorState.getCurrentContent()))
                let newText = fullText.replace(/<[^>]*>/g, '').replace(/\r\n/g, '')
                if (newText.length > 300) {
                    newText = (newText.slice(0, 297) + '...').replace(/\n/, '')
                } else {
                    newText = newText.replace(/\n/, '')
                }
                this.setState({shortText: newText}, this.deleteImages)
            } else {
                this.deleteImages()
            }
        }
    };
    onCorrectTitle = () =>{
        if(this.state.title){
            this.setState({
                isTitle:true
            });
            return true;
        }else{
            this.setState({
                isTitle:false
            });
            return false; 
        }
    }
    onCorrectFullText = () => {
        if(convertToRaw(this.state.fullTextEditorState.getCurrentContent()).blocks[0].text){
            this.setState({
                isFullTextCorrect:true
            });
            return true;
        }else{
            this.setState({
                isFullTextCorrect:false
            });
            return false;
        }
    };
    onPreview = () => {
        if(this.onCorrectTitle() && this.onCorrectFullText()){
            this.setState({
                isPreview: true
            });
        }
    };

    onSaveChangeStatus = () => {
        if(this.onCorrectTitle() && this.onCorrectFullText()){
            this.setState({isPublic: !this.state.isPublic}, this.checkText)
        }
    };

    onPublish = () => {        
        if(this.onCorrectTitle() && this.onCorrectFullText()){
            this.setState({isPublic: true}, this.checkText)
        }
    };

    onDraft = () => {
        if(this.onCorrectTitle() && this.onCorrectFullText()){
            this.setState({isPublic: false}, this.checkText)
        }
    };
    onCancel = () => {
        this.props.history.push({
            pathname: '/admin-panel/news'
        });
    };

    deleteImages = () => {
        if(this.state.deletedImages.length) {
            axios({
                method: 'delete',
                url: `${server}/api/uploadGalleryImage/`,
                data: this.state.deletedImages,
                config: {headers: {'Content-Type': 'application/json; charset=UTF-8'}},
            })
            .then(response => this.saveNews())
            .catch(function (error) {
                console.log(error);
            });  
        } else {
            this.saveNews();
        }
    }
    saveNews = () => {
        if(this.props.location.state){
            this.updatePostVk();
            this.sendNews();
            
        }else{
            this.setState({socialNetworksModal: true});
        }
    };
    sendNews = (idVK) => {
        let formData  = new FormData();
        let sendedBody = this.state;
        sendedBody.idVK = idVK;
        Object.keys(sendedBody).forEach(key => formData.append(key, this.state[key]));
        formData.append('fullText', JSON.stringify(convertToRaw(this.state.fullTextEditorState.getCurrentContent())));
        let id = '';
        if (this.props.location.state) {
            id = this.props.location.state.detail._id;
        }
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/api/news/` + id : `${server}/api/news/`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
        })
        .then(response => {
            this.props.history.push({
                pathname: '/admin-panel/news'
            })  
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    deleteImage = () => {
        this.setState({
            imageData: '',
            image: ''
        })   
    }

    getFiltersListByType = (type) => {
        axios({
            method: 'get',
            url: `${ server }/api/filters?type=${type}`
        })
        .then(res => {
            this.setState({
                filters: res.data.filterList,
            })
        })     
    }
    getTextofPost = () => {
            let token = '37ad70cb0eaf87ba4a7c79f6ade8668740959edbe1f09250664e6ac748ea496a5a305b8efad4cfe29b679';
            let id = '-169499477';
            let title = `${this.state.title}%0A`;
            let textfromEditor = convertToRaw(this.state.fullTextEditorState.getCurrentContent()).blocks;
            let info = '';
            for (let i = 0; i< textfromEditor.length; i++){
                info+=textfromEditor[i].text + '%0A';
            }
            let text = `${title}${info}`;
            return text;
        };
        getActiveSocialNetworks = (e) => {
            e.target.classList.contains('active-social-networks')?
            e.target.classList.remove('active-social-networks'):
            e.target.classList.add('active-social-networks');
        }
        closeModalWindow = () => {
            this.sendNews();
            this.setState({
                socialNetworksModal: false
            });
        };
        publish = () => {
            let vkIcon = document.querySelector('.vkontakte-social-network');
            if(vkIcon.classList.contains('active-social-networks')){
             this.publishVk();        
            };
         };
         publishVk = () => {
            let token = '37ad70cb0eaf87ba4a7c79f6ade8668740959edbe1f09250664e6ac748ea496a5a305b8efad4cfe29b679';
            let id = '-169499477';
            let text = this.getTextofPost();
            axios({
                method: 'post',
                adapter: jsonpAdapter,
                url: `https://api.vk.com/method/wall.post?owner_id=${id}&from_group=0&message=${text}&access_token=${token}&v=5.80`            
            })        
            .then(res =>{
                this.sendNews(res.data.response.post_id)                   
            })
        };
        updatePostVk = () => {
            let token = '37ad70cb0eaf87ba4a7c79f6ade8668740959edbe1f09250664e6ac748ea496a5a305b8efad4cfe29b679';
            let id = '-169499477';
            let text = this.getTextofPost();
            axios({
                method: 'get',
                adapter: jsonpAdapter,
                url: `https://api.vk.com/method/wall.edit?owner_id=${id}&post_id=${this.state.idVK}&message=${text}&access_token=${token}&v=5.80`            
            })
        };  
}

export default withRouter(AdminAddNews);