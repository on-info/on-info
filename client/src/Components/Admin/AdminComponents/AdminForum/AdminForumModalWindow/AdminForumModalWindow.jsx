import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../../../../api';
import Button from '../../../../Button/Button';
import TextField from '../../../../TextField/TextField';
import './AdminForumModalWindow.css';

class AdminForumModalWindow extends Component { 
    state = {
        groupTitle: '',
        topicTitle: '',
        selectedValue: '',
        group_id: '',
        user_id: '5b5387ff2b3b0f1b28896767'      /* todo: change this field */
    }
    
    componentDidMount() {
        this.setState({
            selectedValue: 'group',
        })
    }

    render() { 
        return(
            <div className = 'modal-forum-window-new'> 
                <div className = 'admin-forum-add-record'>
                    <div>Создать новую 
                        <select onChange = {this.chooseValue} className = 'admin-forum-select' value = {this.state.selectedValue}>
                            <option value = 'group'>группу</option>
                            <option value = 'topic'>тему</option>
                        </select>
                        для форума
                    </div>
                    {this.state.selectedValue === 'group' ? 
                        <div className = 'admin-forum-create-record'>
                            <TextField 
                                label = 'Название группы'
                                type = 'text'
                                id = 'forum-record-title'
                                name = 'forum-record-title'
                                value = {this.state.groupTitle}
                                onChangeValue = {this.onChangeValueGroup}
                            />   
                            <Button
                                name = 'button-admin admin-cancel'
                                label = {<span aria-hidden="true">&times;</span>}
                                clickHandler = {this.clearTitle}
                            />                 
                        </div> :

                        <div className = 'admin-forum-create-record topic'>
                            <div className = 'topic-title'>
                                <TextField 
                                    label = 'Название темы'
                                    type = 'text'
                                    id = 'forum-record-title'
                                    name = 'forum-record-title'
                                    value = {this.state.topicTitle}
                                    onChangeValue = {this.onChangeValueTopic}
                                />   
                                <Button
                                    name = 'button-admin admin-cancel'
                                    label = {<span aria-hidden="true">&times;</span>}
                                    clickHandler = {this.clearTitle}
                                /> 
                            </div> 
                            <div className = 'groups-select'>   
                                <span className = 'groups-options-label'>Название группы</span>
                                <select onChange = {this.chooseGroup} className = 'admin-forum-select' defaultValue = 'Выберите группу'>
                                    <option value = '' hidden>Выберите группу</option>
                                    {this.props.groups.map(group => 
                                        <option value = {group._id} key = {group._id}>{group.groupTitle}</option>
                                    )}
                                </select> 
                            </div>              
                        </div> 
                    }
                </div>
                <div className = 'admin-buttons'>
                    <Button
                        name = 'button-admin close-window'
                        clickHandler = {this.saveNewRecord}
                        label = 'Создать'
                    /> 
                    <Button 
                        name = 'button-admin close-window'
                        clickHandler = {this.closeModalWindow}
                        label = 'Отмена'
                    />
                </div>            
            </div>
        )
    }
    chooseValue = (event) => {
        this.setState({
            selectedValue: event.target.value,
        })
    }

    chooseGroup = (event) => {
        this.setState({
            group_id: event.target.value
        })
    }

    saveNewRecord = () => {
        if(this.state.topicTitle || this.state.groupTitle){     
            axios({
                method: 'post',
                url: this.state.topicTitle ? `${ server }/api/forumTopic` : `${ server }/api/forumGroup`,
                data: this.state,
                config: { headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }},
            })
            .then((result) => {
                this.setState({            
                    topicTitle: '',
                    groupTitle: '',
                    selectedValue: 'group',
                    group_id: ''
                }) 
                this.props.changeState()
                this.props.getRecords()
                this.props.getTopics()
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    onChangeValueGroup = (str) => {
        this.setState({groupTitle: str});
    }
    onChangeValueTopic = (str) => {
        this.setState({topicTitle: str});
    }

    clearTitle = () => {
        this.setState({
            groupTitle: '',
            topicTitle: '',
            groups: []
        });
    }
    closeModalWindow = (e) => {
        this.props.closeModalWindow(e)
        this.setState({
            selectedValue: 'group',
            groupTitle: '',
            topicTitle: ''
        })
    }
}
export default AdminForumModalWindow;