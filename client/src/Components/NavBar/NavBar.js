import React from 'react';
import "./NavBar.css";
import MainList from "../Menu/MenuLinks";

const NavBar = ()=>{
    return (
        <div className="navbar">
                 <MainList
                     className="menu-list-admin" 
                     list = {[
                         {name: 'Список пользователей', url :'/admin-panel/dashboard'},
                         {name: 'События', url :'/admin-panel/events'},
                         {name: 'Новости', url : '/admin-panel/news'},
                         {name: 'Проекты', url : '/admin-panel/projects'},
                         {name: 'Фильтры', url : '/admin-panel/filters'},
                         {name: 'Форум', url : '/admin-panel/forum'}
                     ]} 
                     classActive = 'active-link-admin'/>
        </div>       
    )
}
export default NavBar;