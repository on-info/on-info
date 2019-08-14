import React, { Component } from 'react';
import "../TextAndFormMainPage/TextAndForm.css";
import SubscribtionForm from "../SubscribtionForm/SubscribtionForm";

class TextAndForm extends Component {
  
  render() {
    return (
        <div className = 'text-and-form'>
      			<h2>КТО МЫ?</h2>
      			<h3> Мы сообщество людей, которые помогают особенным людям или 
      			людям с особенными детьми. Сейчас сайт находится в разработке, 
      			если хотите получать наши новости оставьте, пожалуйста, вашу электронную почту.</h3>
            <SubscribtionForm />
        </div>
    );
  }
}

export default TextAndForm;