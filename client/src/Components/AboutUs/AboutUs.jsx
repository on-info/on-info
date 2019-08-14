import React, { Component } from 'react';
import TextAndForm from "../TextAndFormMainPage/TextAndForm"
import "../AboutUs/AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
		  <div className= 'about-us with-picture'>
			  <TextAndForm />
  		</div>
    );
  }
}

export default AboutUs;