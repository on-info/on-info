import React, {Component} from 'react';
import {EditorState, SelectionState, Modifier} from 'draft-js';
import {Carousel} from 'react-responsive-carousel';

import ModalWindow from '../../../../../ModalWindow/ModalWindow';
import Button from '../../../../../Button/Button';
import './ImageSlider.css';
import '../../../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

class ImageSlider extends Component {
    state = {
        isOpen: false,
        imageArr: []
    }

    componentWillReceiveProps(nextProps) {
        const {block, contentState, deletedImages} = nextProps;   
        const entity = contentState.getEntity(block.getEntityAt(0));
        this.setState({imageArr: entity.getData().src})
    }

    componentDidMount() {
        const {block, contentState} = this.props;   
        const entity = contentState.getEntity(block.getEntityAt(0));
        this.setState({imageArr: entity.getData().src})

        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isOpen: false
            });
        });
    }

    render() {
        return (
            <div>
                <Carousel
                    showThumbs = {false}
                    infiniteLoop = {true}
                    statusFormatter = {(current, total) => `${current} из ${total}`}
                    >
                    {this.state.imageArr.map((item, index) =>
                        <div key = {index} >
                            {this.props.isAdmin ? 
                                <Button 
                                    name = "delete-slider"
                                    clickHandler = {this.deleteSlider}
                                    label = "Удалить"
                                /> :
                                null
                            }
                            <div onClick = {this.openModalWindow}>
                                <img style = {{backgroundImage: `url(${item})`}} />
                            </div>
                        </div>
                    )}
                </Carousel>
                <div className = {this.state.isOpen ? 'overlay' : 'overlay hidden'}>
                    <div className="modal-element">
                        <ModalWindow 
                            isOpen = {this.state.isOpen}
                            onChangeImageArr = {this.onChangeImageArr}
                            addSlider = {this.editSlider}
                            imageArr = {this.state.imageArr}
                            closeModalWindow = {this.closeModalWindow}
                            getDeletedImages = {this.props.getDeletedImages}
                        />
                    </div>
                </div>
            </div> 
        )
    }
    openModalWindow = () => {
        if (this.props.isAdmin) { 
            this.setState({isOpen: true}, () => this.props.setReadOnly(true))
        }
    }
    
    closeModalWindow = (e) => {
        if (e.target.className === 'overlay' || ~e.target.className.indexOf('close-window')) {
            this.props.setReadOnly(false)
            this.setState({
                isOpen: false,
                imageArr: []
            })
        } 
    }

    onChangeImageArr = (imageArr, callback) => {
        this.setState({imageArr: imageArr}, callback)
    }

    editSlider = () => {
        const {contentState, onChange} = this.props
        let entityKey = this.props.block.getEntityAt(0)
        let newContentState = contentState.mergeEntityData(
            entityKey,
            {src: this.state.imageArr}
        )

        onChange(EditorState.createWithContent(newContentState))

        this.setState({
            isOpen: false,
            imageArr: []
        }, () => this.props.setReadOnly(false))
    }

    deleteSlider = () => {
        const {contentState, onChange} = this.props

        let blockKey = this.props.block.getKey()
        let targetRange = new SelectionState({
            anchorKey: blockKey,
            anchorOffset: 0,
            focusKey: blockKey,
            focusOffset: this.props.block.getLength()
        })
        let contentWithoutBlock = Modifier.removeRange(contentState, targetRange, 'backward')
        let contentResetBlock = Modifier.setBlockType(contentWithoutBlock, contentWithoutBlock.getSelectionAfter(), 'unstyled')

        onChange(EditorState.createWithContent(contentResetBlock))
        
        this.setState({
            isOpen: false,
            imageArr: []
        })
    }
}
export default ImageSlider;