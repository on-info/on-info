import React, {Component} from 'react';
import {AtomicBlockUtils} from 'draft-js';
import PropTypes from 'prop-types';

import ModalWindow from '../../../ModalWindow/ModalWindow';
import slider from '../../../../Assets/AssetsSvg/mbri-image-slider.svg';
import './AdminSlider.css';

class AdminSlider extends Component {
    state = {
        isOpen: false,
        imageArr: []
    }
    
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object
    }

    componentDidMount(){
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) {
                this.props.setReadOnly(false, () =>
                this.setState({
                    isOpen: false,
                    imageArr: []
                }));
            }
        });
    }
 
    render() {
        return (
            <div 
                className = 'rdw-option-wrapper' 
                aria-selected = 'false' 
                title = {!this.state.isOpen ? 'Слайдер' : null} 
                onClick = {this.openModalWindow}
            >
                <img src = {slider} alt = '' />
                <div className = {this.state.isOpen ? 'overlay' : 'overlay hidden'} onClick = {this.closeModalWindow}>
                    <div className="modal-element">
                        <ModalWindow 
                            isOpen = {this.state.isOpen}
                            addSlider = {this.addSlider}
                            onChangeImageArr = {this.onChangeImageArr}
                            closeModalWindow = {this.closeModalWindow}
                            getDeletedImages = {this.props.getDeletedImages}
                        />
                    </div>
                </div>
            </div>
        );
    }
    
    openModalWindow = () => {
        this.setState({isOpen: true})
    }

    closeModalWindow = (e) => {
        if (e.target.className === 'overlay' || ~e.target.className.indexOf('close-window')) {
            e.preventDefault()
            e.stopPropagation()
            this.setState({
                isOpen: false
            })
        } 
    }
    addSlider = () => {
        const {editorState, onChange} = this.props;
        let entityData = {}
        let newEditorState = editorState

        entityData.src = this.state.imageArr

        let entityKey = newEditorState.getCurrentContent().createEntity('IMAGE_SLIDER', 'MUTABLE', entityData).getLastCreatedEntityKey()
        newEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')

        onChange(newEditorState)
        
        this.setState({
            isOpen: false,
            imageArr: []
        })
    }
    onChangeImageArr = (imageArr, callback) => {
        this.setState({imageArr: imageArr}, callback)
    }
}
export default AdminSlider;