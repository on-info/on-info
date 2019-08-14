import React, {Component} from 'react';

import AdminForumTopic from '../AdminForumTopic/AdminForumTopic';
import './AdminForumTopicsList.css';

class AdminForumTopicsList extends Component {
    state = {
        filteredTopics: []
    }

    componentDidMount() {
        this.props.filteredTopics.length ?       
            this.setState({
                filteredTopics: this.props.filteredTopics,
            }) :
        null
    }

    componentWillReceiveProps(nextProps) {
        nextProps.filteredTopics ?        
            this.setState({
                filteredTopics: nextProps.filteredTopics,
            }) 
            :
        null
    }

    render() {
        return(
            <div className = 'forum-group-list'>
                {this.state.filteredTopics.map(item => {
                    if(item.group_id._id === this.props.id) {
                        return (
                            <AdminForumTopic 
                                changeMode = {this.props.changeMode}
                                title = {item.topicTitle} 
                                id = {item._id}
                                key = {item._id}  
                                deleteHandler = {() => this.props.deleteTopic(item)} 
                                checkId = {this.props.checkId}
                                groups = {this.props.groups}
                                getTopics = {this.props.getTopics}
                                topic = {item}
                                showTopics = {this.props.showTopics}
                            />
                        )
                    }
                })}
            </div>
        )
    }
}
export default AdminForumTopicsList;