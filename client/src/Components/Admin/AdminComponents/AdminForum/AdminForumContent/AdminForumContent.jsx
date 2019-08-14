import React, {Component} from 'react';

import AdminForumInfo from '../AdminForumInfo/AdminForumInfo';
import AdminForumGroupsList from '../AdminForumGroupsList/AdminForumGroupsList';
import AdminForumPostsList from '../AdminForumPostsList/AdminForumPostsList';
import './AdminForumContent.css';

class AdminForumContent extends Component {
    state = {
        mode: '',
        isStateChanged: false,
        topic: {}
    }
    componentDidMount() {
        this.setState({
            mode: 'groups'
        })
    }


    render() {
        return(
        <div className = 'admin-position-content'>
            <AdminForumInfo 
                isStateChanged = {this.state.isStateChanged}
            />
            <div>
                {this.state.mode === 'groups' ? 
                <AdminForumGroupsList 
                    changeMode = {this.changeMode}
                    changeState = {this.changeState}
                /> : 
                    this.state.mode === 'posts' ?
                    <AdminForumPostsList 
                        changeMode = {this.changeMode}
                        changeState = {this.changeState}
                        topic = {this.state.topic}
                    /> : null
                }
            </div>
        </div>
        )
    }

    changeMode = (str, obj) => {
        this.setState({
            mode: str,
            topic: obj
        })
    }

    changeState = () => {
        this.setState({
            isStateChanged: !this.state.isStateChanged
        })
    }
}

export default AdminForumContent;