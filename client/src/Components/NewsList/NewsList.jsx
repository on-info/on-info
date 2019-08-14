import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import News from '../News/News';
import '../NewsList/NewsList.css';
import { server } from '../../../src/api';

class NewsList extends Component {
    
    render() {
        return (
         <div className = {this.props.name}>
            <Masonry className = 'masonry-div'> 
                {(this.props.array) ? this.props.array.map(function(el){
                    return <News 
                                id = {el._id} 
                                name = {el.title} 
                                text = {el.shortText} 
                                date = {el.createdAt} 
                                key = {el._id} 
                                img = {(el.image!='undefined')?el.image:null}
                            />
                }):null}
            </Masonry>
         </div>
        ) 
    }
    

}

export default NewsList;

