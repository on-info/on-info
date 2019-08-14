import React, { Component } from 'react';
import AboutUs from "../../Components/AboutUs/AboutUs";
import Footer from "../../Components/Footer/Footer";
import Menu from "../../Components/Menu/Menu";
import "../Home/MainPage.css"
class Home extends Component {
  render() {
    return (
			<div className="main-page-client">
		  	<Menu name = 'client-menu'/>
				<AboutUs/>
				<Footer name = 'footer-client'/>
			</div>
    );
  }
}

export default Home;