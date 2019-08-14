import React from "react";
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import AdminFiltersContent from '../../Admin/AdminComponents/AdminFiltersContent/AdminFiltersContent';

const AdminFiltersBlock = () => {
    return (
        <div className="admin-content">
          <Navigation onLogout={this.onLogout} />
          <NavBar />
          <AdminFiltersContent />  
        </div>          
    )
}

export default AdminFiltersBlock;