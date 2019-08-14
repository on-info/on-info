import React, {Component} from 'react';
import AdminUser from '../AdminUser/AdminUser';
import './AdminUsersList.css';

class AdminUsersList extends Component {
    render() {
         return (
            <div className="admin-part-users">
                <div className="admin-part-users-header">
                    <div>Пользователь</div>
                    <div>Подписка</div>
                </div>
                <div>
                    {this.props.users.map(user => 
                        <AdminUser user = {user} key = {user._id} />
                    )}
                </div>   
            </div>    
        )
    }
}

export default AdminUsersList;