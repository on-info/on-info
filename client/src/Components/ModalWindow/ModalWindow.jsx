import React, {Component} from 'react';
import axios from 'axios';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import {server} from '../../api';
import Button from '../Button/Button';
import './ModalWindow.css';

class ModalWindow extends Component { 
    state = {
        imageData: '',
        image: '',
        imageArr: [],
        deletedImages: []
    }

    componentWillReceiveProps(nextProps) {
        nextProps.isOpen ? null : this.setState({imageArr: []})
        nextProps.imageArr ? this.setState({
            imageArr: nextProps.imageArr}) : null
    }
    
    render() {
        const SortableItem = SortableElement(({link, sortIndex}) =>
            <div className = 'admin-title-image'>
                <img src = {link} alt = '' className = 'slider-image' />
                <Button 
                    name = 'button-admin admin-cancel'
                    label = {<span aria-hidden='true'>&times;</span>} 
                    clickHandler =  {() => this.deleteGalleryImage(sortIndex)}
                />
            </div>      
        );
        const SortableList = SortableContainer(({items}) => {
            return (
                <div className = 'image-array'>
                    {items.map((value, index) => {
                        return (
                            <SortableItem
                                key = {`item-${index}`}
                                sortIndex = {index}
                                index = {index}
                                link = {value}
                            />
                        )
                    })}
                </div>
            )
        });   

        return(
            <div className = 'modal-window-new'> 
                 <div className = 'admin-image'>
                    <label htmlFor = {this.props.id}>Фото:</label>
                    <div className = 'admin-button'>
                        <div className = 'choose-file'>
                            <span>Выберите файл</span>
                        </div>
                        <input
                            id = 'slider-image' 
                            type  = 'file'
                            name = 'slider-image'
                            onChange = {this.onChangeFile}
                            multiple
                        />
                    </div>
                </div> 
                {this.state.imageData || this.state.imageArr.length ?  
                    <SortableList 
                        items = {this.state.imageArr} 
                        onSortEnd = {this.onSortEnd} 
                        shouldCancelStart = {this.shouldCancelStart}
                        axis = 'xy' 
                        helperClass = 'sortable-helper'
                        lockToContainerEdges = {true}
                        lockOffset = '0%'
                    /> :
                    null
                }
                <div className = 'admin-buttons'>
                    {this.state.imageArr.length ?
                        <Button 
                            name = 'button-admin'
                            clickHandler = {this.saveModalWindow}
                            label = 'Ok'
                        /> :
                        null
                    }
                    <Button 
                        name = 'button-admin close-window'
                        clickHandler = {this.props.closeModalWindow}
                        label = 'Отмена'
                    />
                </div>
            </div>
        )
    }
    onChangeFile = (event) => {
        const imageType = /^image\//
        for (let i = 0; event.target.files[i]; i++) {
            let file = event.target.files[i]
            let reader = new FileReader()

            if (!file || !imageType.test(file.type)) {
                return
            }
            reader.onload = (e) => {
                this.setState({imageData: e.target.result}, this.addImage)
            }
            reader.readAsDataURL(file)
        }
        event.target.value = null
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            imageArr: arrayMove(this.state.imageArr, oldIndex, newIndex),
        });
    };

    shouldCancelStart = (e) => {
        if (['button', 'span'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
            return true
        }
    }

    deleteGalleryImage = (index) => {
        let imageArr = this.state.imageArr.slice()
        let deletedImages = this.state.deletedImages
        let deletedImage = imageArr.splice(index, 1)
        deletedImages.push(deletedImage)
        this.setState({
            imageArr: imageArr,
            deletedImages: deletedImages
        }, () => this.props.getDeletedImages(this.state.deletedImages))
    }

    addImage = () => {
        let formData  = new FormData();
        formData.append('imageData', this.state.imageData);
        axios({
            method: 'post',
            url: `${server}/api/uploadGalleryImage/`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
        })
        .then(response => {
            let imageArr = this.state.imageArr
            imageArr.push(response.data.link)
            this.setState({
                imageArr: imageArr
            }) 
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    saveModalWindow = (e) => {
        e.preventDefault()
        this.props.onChangeImageArr(this.state.imageArr, () => {this.props.addSlider(e)})
    }
}
export default ModalWindow;