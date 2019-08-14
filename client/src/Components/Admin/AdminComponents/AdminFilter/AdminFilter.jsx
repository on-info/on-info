import React, {Component} from 'react';
import Button from '../../../Button/Button';
import '../AdminFilter/AdminFilter.css';

class AdminFilter extends Component {
    render() {       
        return (
            <div>
                    <div  id = {this.props._id} className = 'admin-filter-container'>
                        <span className = 'admin-filter-title'>{this.props.filter}</span>
                        <Button
                            name = "button-admin"
                            label = {<span aria-hidden="true">&times;</span>}
                            clickHandler = {this.props.deleteHandler}
                        />
                    </div>                
            </div>           
        )
    }
}

export default AdminFilter;
