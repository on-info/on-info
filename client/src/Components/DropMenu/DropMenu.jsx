import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import eventsImg from '../../Assets/AssetsSvg/event.svg';
import projectsImg from '../../Assets/AssetsSvg/idea.svg';
import '../DropMenu/DropMenu.css'

class DropMenu extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
           <ul className = 'drop-menu'> 
             <li className = 'drop-menu-events'>         
                  <NavLink to = '/events'>
                    <img src = {eventsImg}/>
                    <p> События</p> 
                  </NavLink>
             </li>
             <li className = 'drop-menu-projects'>
              <NavLink to = '/projects'>
                <img src = {projectsImg}/>
                <p> Проекты</p> 
              </NavLink>  
             </li>
          </ul>
  	
    );
  }

}

export default DropMenu;