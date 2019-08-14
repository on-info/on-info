import React, {Component} from 'react';
import './SubscribtionForm.css';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import { server } from '../../api';
import axios from 'axios';
import ToastrContainer, {Toast} from 'react-toastr-basic'


class SubscribtionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',      
            sendToValidation :false
        }
    }

    onFocusInput = () => {
        this.setState({sendToValidation:false})
    }
 
    getEmail = (str) => {
       this.setState({value:str});
     }
     clickHandler = () => {
        this.setState({sendToValidation:true});
        if(this.state.valid){
            this.showToast();
            this.onSubscribe();
            this.setState({value:''})
        }
    }
    showToast(){
        Toast('Вы подписались на наши уведомления!');
    }

    onSubscribe = () => {
        const newValue = this.state.value;
        axios({
            url:` ${server}/api/subscription/newsubscription`,
            method:'post',
            config:{
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            mode:'cors',
            data:{email: newValue}
        })
    }
    render() {
        return (
            <div className='subscribtion-form'> 
                <ToastrContainer />
                <div className='wrapper-input'>
                    <TextField 
                        value = {this.state.value }
                        sendToValidation = {this.state.sendToValidation}
                        type='email'
                        nameClass='input-email'
                        placeholder="Введите адрес электронной почты"
                        name='email'
                        onChangeValue={this.getEmail}
                        onFocusInput={this.onFocusInput}
                        onSubscribe={this.onSubscribe}
                    />
                    
                </div>
                <Button name='button-subscribe'
                        label="подписаться"
                        clickHandler={this.clickHandler}/>
            </div>
        );
    }
}

    export default SubscribtionForm ;