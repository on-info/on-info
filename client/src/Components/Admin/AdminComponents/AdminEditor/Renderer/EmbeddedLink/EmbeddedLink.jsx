import React, {Component} from 'react';

class EmbeddedLink extends Component {
    render() {
        const { block, contentState } = this.props;    
        const entity = contentState.getEntity(block.getEntityAt(0));
        const { src, height, width } = entity.getData();
        return (<iframe height={height} width={width} src={src} frameBorder="0" allowFullScreen title="Wysiwyg Embedded Content" />);
    }
};

export default EmbeddedLink;