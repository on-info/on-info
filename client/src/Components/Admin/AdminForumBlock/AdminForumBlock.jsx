import React from "react";
import AdminForumContent from '../AdminComponents/AdminForum/AdminForumContent/AdminForumContent';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import './AdminForumBlock.css';

const AdminForumBlock = () => {
    return (
        <div className="admin-content">
            <Navigation onLogout={this.onLogout}/>
            <NavBar />
            <AdminForumContent />
        </div>          
    )
}

export default AdminForumBlock;
