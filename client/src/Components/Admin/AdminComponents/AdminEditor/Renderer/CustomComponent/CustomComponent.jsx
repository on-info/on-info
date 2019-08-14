import React, {Component} from 'react';
import ImageSlider from '../ImageSlider/ImageSlider'
import EmbeddedLink from '../EmbeddedLink/EmbeddedLink'
import Image from '../Image/Image'

class CustomComponent extends Component {
    render() {
        const {block, contentState, blockProps} = this.props;    
        const entity = contentState.getEntity(block.getEntityAt(0));

        if (entity && entity.type === 'IMAGE') {
            return(<Image contentState = {contentState} block = {block} />)
        }

        if (entity && entity.type === 'EMBEDDED_LINK') {
            return(
                <EmbeddedLink contentState = {contentState} block = {block} />
            )
        }

        if (entity && entity.type === 'IMAGE_SLIDER') {
            return(
                <ImageSlider 
                    contentState = {contentState} 
                    block = {block} 
                    onChange = {blockProps.onChange} 
                    isAdmin = {blockProps.isAdmin}
                    getDeletedImages = {blockProps.getDeletedImages}
                    setReadOnly = {blockProps.setReadOnly}
                />
            )
        }
    }
}

export default CustomComponent