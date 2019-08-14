import React, {Component} from 'react';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import AdminDatePicker from '../AdminDatePicker/AdminDatePicker';
import Navigation from '../../../Navigation/Navigation';
import NavBar from '../../../NavBar/NavBar';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import EventModal from '../../../EventModal/EventModal';
import './AdminCreateEvent.css';
import {server} from '../../../../api';
import Editor from  "../AdminEditor/AdminEditor";
import AdminSelectSearch from '../AdminSelectSearch/AdminSelectSearch';
import jsonpAdapter from 'axios-jsonp';
import vkIcon from '../../../../Assets/AssetsSvg/vk_icon.svg';

class AdminCreateEvent extends Component { 
    state = {
        title: '',
        place:'',
        dateStart:new Date(),
        timeEnd:'',
        participation: '',
        linkParticipation:'',
        organizers:'',
        speaker: '',
        speakersArray: [],
        contactPerson: '',
        contactPhone: '',
        organization: '',
        website: '',
        textEditorState: EditorState.createEmpty(),
        filter:'',
        getInputTimeEnd : false,
        deletedImages: [],
        idVK: '', 
        socialNetworksModal: false 
    }
    componentDidMount (){
        this.getFiltersList();
        if(this.props.location.state){
            let {title,
                place,
                dateStart,
                timeEnd,
                participation,
                linkParticipation,
                organizers,
                speaker,
                speakersArray,
                contactPerson,
                contactPhone,
                organization,
                website,
                filter,
                text,
                _id,
                idVK
               } = this.props.location.state.detail;
               let textEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(text)));
               this.setState({
                   id: _id,
                   dateStart: dateStart,
                   timeEnd: timeEnd,
                   textEditorState : textEditorState,
                   title: title,
                   getInfo: false,
                   contactPerson: contactPerson,
                   contactPhone: contactPhone,
                   linkParticipation: linkParticipation,
                   organization: organization,
                   place: place,
                   speakersArray: speakersArray,
                   website : website,
                   participation: participation,
                   organizers: organizers,
                   filter: filter,
                   idVK:idVK
               })
        }
    }
    
    render() {
        return(
            <div className="admin-content"> 
                <Navigation onLogout={this.onLogout}/>
                <NavBar />
                <div className = 'admin-create-event'>
                    <div className = 'admin-event-title'>
                        <TextField 
                            label = 'Название события'
                            value = {this.state.title}
                            id = "title" 
                            type = 'text' 
                            name = 'title' 
                            onChangeValue = {this.getValue}
                        />
                    </div>
                    <div className = 'admin-event-place'>
                        <TextField 
                            label = 'Место проведения'
                            value = {this.state.place}
                            type = 'text' 
                            name = 'place' 
                            onChangeValue = {this.getPlace}                            
                        />
                    </div>
                    <div className = 'date-start-event'>
                        <AdminDatePicker 
                            date = {this.state.dateStart} 
                            onSelectDate = {this.getStartDate} 
                            label = 'Дата начала '
                            dateFormat = {true}
                        />
                        <div>
                            {this.state.getInputTimeEnd || this.state.timeEnd ? 
                                <AdminDatePicker 
                                    date = {!this.state.timeEnd ? this.state.dateStart:this.state.timeEnd } 
                                    onSelectDate = {this.getEndDate} 
                                    dateFormat = {false}
                                /> : 
                                <Button 
                                    name = "button-admin button-admin-background" 
                                    label = 'Время окончания' 
                                    clickHandler = {this.getInputTimeEnd}
                                />
                            }
                        </div>
                    </div>                                  
                    <div className = 'admin-event-tickets'>
                        <TextField 
                            label = 'Билеты'
                            value = {this.state.participation}
                            type = 'text' 
                            name = 'tickets' 
                            onChangeValue = {this.getParticipation}
                        />
                    </div>
                    <div className = 'event-link-participation'>
                        <TextField 
                            label = 'Ссылка на регистрацию/покупку билетов'
                            value = {this.state.linkParticipation}
                            type = 'url' 
                            name = 'linkTickets' 
                            onChangeValue = {this.getLinkParticipation}
                        />
                    </div>
                    <div className = 'admin-event-organizers'>
                        <p> Введите организаторов </p>
                        <textarea                             
                            value= {this.state.organizers}
                            onChange = {this.getOrganizers}
                            placeholder = 'Введите организаторов'
                        />
                    </div>
                    <div>
                        <div className = 'speakers-button-event'>
                            <TextField 
                                label = 'Докладчики : '
                                value = {this.state.speaker}
                                type = 'text' 
                                name = 'speakers' 
                                onChangeValue = {this.getSpeaker}
                            />
                            <Button 
                                name = "button-admin button-admin-background" 
                                label = 'Добавить' 
                                clickHandler = {this.addSpeakers}
                            />
                        </div>
                        <div className = 'speakers-list-event'> 
                            <ul>
                                {this.state.speakersArray ?
                                    this.state.speakersArray.map((el,index) => {
                                        <li key = {index}>
                                            <span> {el} </span>
                                            <Button 
                                                name = "event-delete-button" 
                                                label = '&#215;' 
                                                clickHandler = {(e)=> this.deleteSpeaker(e,index)}
                                            />
                                        </li>
                                    })
                                    :null
                                }
                            </ul>
                        </div>
                    </div>
                    <div className = 'admin-event-contact-person'>
                        <TextField 
                            label = 'Введите контактное лицо: '
                            value = {this.state.contactPerson}
                            type = 'text' 
                            name = 'contactPerson' 
                            onChangeValue = {this.getContactPerson}
                        />
                    </div>
                    <div className = 'admin-event-contact-phone'>
                        <TextField 
                            label = 'Введите контактный телефон: '
                            value = {this.state.contactPhone}
                            type = 'text' 
                            name = 'contactPhone' 
                            onChangeValue = {this.getContactPhone}
                        /> 
                    </div>
                    <div className = 'admin-event-organization'>
                        <TextField 
                            label = 'Введите организацию : '
                            value = {this.state.organization}
                            type = 'text' 
                            name = 'organization' 
                            onChangeValue = {this.getOrganization}
                        />
                    </div>
                    <div className = 'admin-event-website'>
                        <TextField 
                            label = 'Введите адресс сайта : '
                            value = {this.state.website}
                            type = 'url' 
                            name = 'website' 
                            onChangeValue = {this.getWebsite}
                        />
                    </div>
                    <Editor 
                        initialEditorState = {this.state.textEditorState} 
                        onEditorStateChange = {this.onEditorStateChange}
                        getDeletedImages = {this.getDeletedImages}
                    />
                    <div className = 'select-wrapper-event'>
                        {this.state.filters ? 
                            <AdminSelectSearch 
                                value = {this.state.filter}
                                filtersList = {this.state.filters}
                                getFilter = {this.getFilter}
                            /> 
                            :null
                        }                              
                    </div>
                    <div className="change-state-buttons">  
                        <Button 
                            name = "button-admin button-admin-background" 
                            label = {this.props.location.state ? 'Обновить': 'Сохранить'} 
                            clickHandler = {this.saveEvent}
                        />
                        <Button 
                            name = "button-admin button-admin-background" 
                            label = 'Отменить' 
                            clickHandler = {this.onCancel}
                        /> 
                    </div> 
                    <div 
                        className={(this.state.socialNetworksModal &&!this.props.location.state) ? 'overlay' : 'overlay hidden'} 
                    >
                        <div className="modal-event-field modal-social-event">
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
                </div>
            </div>
        )
    }
    getActiveSocialNetworks = (e) => {
        e.target.classList.contains('active-social-networks')?
        e.target.classList.remove('active-social-networks'):
        e.target.classList.add('active-social-networks');
    }
    getValue = (str) => {
        this.setState({title: str});
    }
    getStartDate = (str) =>{
        this.setState({dateStart: str})
    }
    getEndDate = (str) =>{
        this.setState({timeEnd: str})
    }
    onEditorStateChange = (editorState) => {
        this.setState({textEditorState: editorState});
    }
    getDeletedImages =  (deletedImages) => {
        this.setState({deletedImages: deletedImages})
    }
    getFilter = (str) => {
        this.setState({filter: str});
    }
    saveEvent = () => {
        if(this.props.location.state){
            this.updatePostVk();
            this.sendEvent();
            
        }else{
            this.setState({socialNetworksModal: true});
        }
    }
    sendEvent = (idVK) => {        
        let id = ''
        if (this.props.location.state) {
            id = this.props.location.state.detail._id;
        }
        const sendedBody = this.state;
        sendedBody.idVK = idVK;
        sendedBody.text = JSON.stringify(convertToRaw(this.state.textEditorState.getCurrentContent()));
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/api/events/` + id : `${server}/api/events/`,
            data: sendedBody,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }},
        })
        .then(response => {
            this.props.history.push({
                pathname: '/admin-panel/events'
            })  
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/admin-panel/events'
        });
    };
    getPlace = (str) => {
        this.setState({place:str});
    };
    getParticipation = (str) => {
        this.setState({participation:str});
    };
    getLinkParticipation = (str) => {
        this.setState({linkParticipation:str});
    };
    getOrganizers = (e) => {
        this.setState({organizers:e.target.value});
    };
    getSpeaker = (str) => {
        this.setState({speaker: str})
    };
    addSpeakers = () => {
        let {speakersArray, speaker} = this.state;
        speakersArray.push(speaker);
        this.setState({speakersArray:speakersArray, speaker:''});        
    }
    deleteSpeaker = (e,index) => {
       let {speakersArray} = this.state;
       speakersArray.splice(index, 1);
       this.setState({speakersArray:speakersArray});
    }
    getOrganization = (str) => {
        this.setState({organization: str});
     };
    getContactPerson = (str) => {
        this.setState({contactPerson: str});
    };
    getContactPhone =(str) => {
        this.setState({contactPhone : str});
    };
    getWebsite = (str) => {
        this.setState({website : str});
    }
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/api/filters`,
        })
        .then(res =>{
            let filterList = res.data.filterList;
            let filtersEvents = _.filter(filterList , function(el){
                if(el.type === 'events'){
                    return el
                }
            });
            this.setState({
                filters:filtersEvents,
            })
        })
     
      }
    getInputTimeEnd = () => {
        this.setState({getInputTimeEnd : true});
    };
    publish = () => {
       let vkIcon = document.querySelector('.vkontakte-social-network');
       if(vkIcon.classList.contains('active-social-networks')){
        this.publishVk();        
       };
    };
    getTextofPost = () => {
        let title = `${this.state.title}%0A`;
        let place = this.state.place ? `Место: ${this.state.place}%0A` : '';        
        let time = this.state.dateStart?this.state.timeEnd ? `Время: ${moment(this.state.dateStart).format("D MMMM YYYY, H : mm")}-${moment(this.state.timeEnd).format(" H : mm")}%0A` : `Время: ${moment(this.state.dateStart).format("D MMMM YYYY, H : mm")}%0A`:'';
        let participation = this.state.participation ? `Участие: ${this.state.participation}%0A` : '';
        let linkParticipation = this.state.linkParticipation ? this.state.participation.match(/[0-9]/)? `Купить билет: ${this.state.linkParticipation}%0A`: `Зарегистрироваться: ${this.state.linkParticipation}%0A`:'';
        let contacts = this.state.contactPerson||this.state.contactPhone ? `Контакты: ${this.state.contactPerson}${this.state.contactPhone}%0A` : '';
        let textfromEditor = convertToRaw(this.state.textEditorState.getCurrentContent()).blocks;
        let info = '';
        for (let i = 0; i < textfromEditor.length; i++){
            info+=textfromEditor[i].text + '%0A';
        }
        let text = `${title}${place}${time}${participation}${linkParticipation}${contacts}${info}`;
        return text;
    }
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
            this.sendEvent(res.data.response.post_id)                   
        })
    }
    closeModalWindow = () => {
        this.sendEvent();
        this.setState({
            socialNetworksModal: false
        });
    } 
}
export default AdminCreateEvent;
