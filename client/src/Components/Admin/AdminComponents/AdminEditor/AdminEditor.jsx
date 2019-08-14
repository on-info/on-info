import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg'; 
import {EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

import {server} from '../../../../api';
import AdminSlider from './AdminSlider';
import customBlockRenderFunc from './Renderer';
import './AdminEditor.css';

class ControlledEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        isReadOnly : false
    }

    setEditorReference = (ref) => {
        this.currentEditor = ref
    }

    componentDidMount() {
        this.props.initialEditorState ? 
            this.setState({editorState: this.props.initialEditorState}) :
            this.setState({editorState: EditorState.createEmpty()}) 
    }
    
    render() {
        let options = ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history']
        if(!this.props.isProject) {
            options.push('image')
        }
        return (
            <div>
                <Editor
                    editorRef = {this.setEditorReference}
					editorState={this.state.editorState}
                    wrapperClassName="wrapper"
                    toolbarClassName="toolbar"
                    editorClassName="editor"
                    toolbarCustomButtons={!this.props.isProject ? [<AdminSlider setReadOnly={this.setReadOnly} getDeletedImages = {this.props.getDeletedImages}/>] : []} 

                    localization={{
                        locale: 'ru'
                    }}
                    stripPastedStyles = {true}
                    toolbar={{
                        options: options, 
                        image: {
                            previewImage: true,
                            uploadCallback: this.uploadImageCallBack,
                            defaultSize: {
                                height: 'auto',
                                width: '100%',
                            },
                        }, 
						blockType: {
							inDropdown: true,
							options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
						}
                    }}
                    onEditorStateChange = {this.onChange}
                    stripPastedStyles = {true}
                    customBlockRenderFunc = {this.customBlockRenderFuncWrap}
                    readOnly = {this.state.isReadOnly}
                />
            </div>
        )
    } 
    onChange = (editorState) => {
        this.setState({editorState: editorState}, () => this.props.onEditorStateChange(editorState))
    }

    customBlockRenderFuncWrap = (block) => {
        return customBlockRenderFunc(block, this.onChange, this.props.getDeletedImages, this.setReadOnly, true)
    }

    uploadImageCallBack = (file) => {
        let formData  = new FormData();
        formData.append('image', file);
        return axios({
            method: 'post',
            url: `${server}/api/uploadImages/`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
        })
    }

    setReadOnly = (isReadOnly, callback) => {
        this.setState({
            isReadOnly : isReadOnly
        }, () => {if (callback) {callback()}})
    }
}
export default ControlledEditor;