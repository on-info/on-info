import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../../../../../node_modules/react-draft-wysiwyg/src/renderer/Image/styles.css';

class Image extends Component {
    static propTypes = {
        block: PropTypes.object,
        contentState: PropTypes.object,
    };

    render() {
        const { block, contentState } = this.props;
        const entity = contentState.getEntity(block.getEntityAt(0));
        const { src, alignment, height, width, alt } = entity.getData();
        return (
            <div className="rdw-image-imagewrapper">
                <img
                    src={src}
                    alt={alt}
                    style={{
                        height,
                        width,
                    }}
                />
            </div>
        );
    }
};

export default Image;