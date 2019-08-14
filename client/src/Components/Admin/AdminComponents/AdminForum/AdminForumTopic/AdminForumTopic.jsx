import React, {Component} from 'react';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

import {server} from '../../../../../api';
import Button from '../../../../Button/Button';
import Checkbox from '../../../../Checkbox/Checkbox';
import './AdminForumTopic.css';

class AdminForumTopic extends Component {
    state = {
        id: '',
        topicTitle: '',
        newTitle: '',
        isChanging: false,
        isMoving: false,
    }
    componentDidMount (){
        this.setState({
            id: this.props.id,
            topicTitle: this.props.title,
            newTitle: this.props.title
        })  
    }

    render() {
       return (
           <div>
                <div className = 'admin-forum-group-record' id = {this.state.id}>
                    <div className = 'admin-forum-record-checkbox'>
                        <Checkbox 
                            name = 'checkbox-id' 
                            onChange = {this.checkId}
                        />
                        <input 
                            type = 'text' 
                            className = {this.state.isChanging ? 'admin-forum-record-title active' : 'admin-forum-record-title'} 
                            name = 'admin-forum-record-title'
                            readOnly = {!this.state.isChanging ? 'true' : null}
                            value = {this.state.newTitle}
                            ref={(input) => {this.nameInput = input}} 
                            onChange = {this.onChange}
                            onClick = {this.changeMode}
                        />
                    </div>
                    <div className = 'admin-forum-buttons'>
                        {!this.state.isChanging ? 
                            !this.state.isMoving ?
                                <div className = 'admin-forum-move-buttons'>
                                    <Button
                                        name = 'button-admin'
                                        label = 'Изменить'
                                        clickHandler = {this.changeRecord}
                                    />
                                    <Button
                                        name = 'button-admin'
                                        label = 'Переместить'
                                        clickHandler = {this.moveRecord}
                                    /> 
                                </div> :
                                <div className = 'admin-forum-change-group'>
                                    <select onChange = {this.chooseGroup} className = 'admin-forum-select' defaultValue = 'Выберите группу'>
                                        <option value = '' hidden>Выберите группу</option>
                                        {this.props.groups.map(group => 
                                            <option value = {group._id} key = {group._id}>{group.groupTitle}</option>
                                        )}
                                    </select> 
                                    <Button
                                        name = 'button-admin'
                                        label = 'Сохранить'
                                        clickHandler = {this.saveRecord}
                                    />
                                    <Button
                                        name = 'button-admin'
                                        label = 'Отмена'
                                        clickHandler = {this.cancelRecord}
                                    />
                                </div>                          
                            :
                            <div className = 'admin-forum-change-buttons'>
                                <Button
                                    name = 'button-admin'
                                    label = 'Сохранить'
                                    clickHandler = {this.saveRecord}
                                />
                                <Button
                                    name = 'button-admin'
                                    label = 'Отмена'
                                    clickHandler = {this.cancelRecord}
                                />
                            </div>
                        }
                    </div> 
                    <div className = 'admin-forum-delete-button'>
                        <Button
                        name = 'button-admin admin-cancel'
                        label = {<span aria-hidden="true">&times;</span>}
                        clickHandler = {this.submit}
                        />
                    </div> 
                </div>
           </div>
        )
    }
    changeMode = () => {
        this.props.changeMode('posts', this.props.topic)
    }
    moveRecord = () => {
        this.setState({
            isMoving: true
        })
    }

    checkId = () => {
        this.props.checkId(this.props.topic)
    }

    onChange = (event) => {
        this.setState({
            newTitle: event.target.value
        })
    }

    chooseGroup = (event) => {
        this.setState({
            group_id: event.target.value
        })
    }

    changeRecord = () => {
        this.setState({
            isChanging: true
        })
        this.focus()
    }

    focus = () => {
        this.nameInput.focus();
    }

    saveRecord = () => {
        this.setState({
            topicTitle: this.state.newTitle
        }, () => {
            axios({
                method: 'put',
                url: `${server}/api/forumTopic/` + this.state.id,
                data: this.state,
                config: { headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }}
            })
            .then(response => {
                this.setState({
                    isChanging: false,
                    isMoving: false
                })
                this.props.getTopics()
                this.props.showTopics()
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }

    cancelRecord = () => {
        this.setState({
            isChanging: false,
            isMoving: false,
            newTitle: this.state.topicTitle
        })
    }

    submit = () => {
        confirmAlert({
          title: 'Тема будет удалена со всеми ответами',
          message: 'Вы точно хотите удалить тему?',
          buttons: [
            {
              label: 'Да',
              onClick: (item) => this.props.deleteHandler(item)
            },
            {
              label: 'Нет',
              onClick: () => {}
            }
          ]
        })
    }
}

export default AdminForumTopic;