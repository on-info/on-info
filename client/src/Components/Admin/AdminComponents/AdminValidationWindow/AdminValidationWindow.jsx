import React, { Component } from 'react';
import ToastrContainer from 'react-toastr-basic'

class AdminValidationWindow extends React.Component {
    componentDidMount(){
        this.props.showToast(this.props.title)
    }
    render() {
        return (
            <div>
                <ToastrContainer />
            </div>
        );
    }
}

export default AdminValidationWindow;