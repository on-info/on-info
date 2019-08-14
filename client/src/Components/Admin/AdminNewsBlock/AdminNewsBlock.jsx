import React from "react";
import AdminNewsContent from '../AdminComponents/AdminNewsContent/AdminNewsContent';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import "./AdminNewsBlock.css";

const AdminNewsBlock = () => {
    return (
        <div className="admin-content">
            <Navigation onLogout={this.onLogout} />
            <NavBar />
            <AdminNewsContent />
        </div>          
    )
}

export default AdminNewsBlock;