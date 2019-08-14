import React, { Component } from 'react';
import './AdminProjectsContent.css';
import AdminProjectsList from '../AdminProjectsList/AdminProjectsList';
import AdminProjectsSearch from '../AdminProjectsSearch/AdminProjectsSearch';
import { server } from "../../../../api";
import { Route } from 'react-router-dom';
import Button from '../../../Button/Button';
import axios from 'axios';
import rubbishImg from '../../../../Assets/AssetsSvg/mbri-trash.svg';

class AdminProjectsContent extends Component {
    state = {
        projects: [],
        filteredProjects: [],
        isLoading: true,
        error: null,
        checkedIds:[]
    }
    componentDidMount(){
        axios({
            url:`${server}/api/projects?isAdmin=true`,
            method:'get',
            mode:'cors'
        })
        .then(res => {        
              this.setState({
                projects : res.data.projects,
                filteredProjects:res.data.projects,
                isLoading: false
            })
        })
        .catch(error => this.setState({ error, isLoading: false }));
     }
     render() {
        const {isLoading, error} = this.state
        if (isLoading) {
            return <p>Loading ...</p>
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return(
            <div className="list-container">
                <div className="new-projects">
                    <AdminProjectsSearch findProjects = {this.findProjects} />
                    <div className="button-new-projects">
                        <Route render={( {history} ) => (
                            <Button 
                                name = "button-admin" 
                                label = {'Создать'} 
                                clickHandler = {() => {history.push('/admin-panel/projects/create')}} 
                            />
                        )}/>
                    </div>
                </div>
                <Button
                    name = "delete-projects" 
                    clickHandler = {this.deleteChosenProjects}
                    disabled = {this.state.checkedIds.length ? false : true}
                    label = {<div>
                                <img src={rubbishImg} alt='' />
                                <span>Удалить</span>
                            </div>}
                />
                <AdminProjectsList 
                    projects = {this.state.filteredProjects}
                    loading={this.state.isLoading}
                    deleteProject = {this.deleteProjects}
                    checkId = {this.checkId}
                    />
            </div>
        )
    }
    deleteProjects = (projects) => {
        let id = projects._id;
        axios({
            method: 'delete',
            url: `${server}/api/projects/${id}`,
            data: projects,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then(result=>{
            this.setState({            
                filteredProjects: this.state.filteredProjects.filter(item => item._id !== result.data.projects._id)
            })
        })
        .catch(error=>{
            console.log(error);
        })    
    };
    checkId = (id) => {
        let tempId = this.state.checkedIds;
        if (~this.state.checkedIds.indexOf(id)) {
            tempId.splice(tempId.indexOf(id), 1)
        } else {
            tempId.push(id)
        }
        this.setState({checkedIds: tempId})
    }
    deleteChosenProjects = projects =>{
        axios({
            method: 'delete',
            url: `${server}/api/projects`,
            data: {'checkedIds': this.state.checkedIds},
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then(result =>{
            this.setState({            
                filteredProjects: this.state.filteredProjects.filter(projects => !~result.data.projects.indexOf(projects._id))
            })
        })
        .catch(err=>{
            console.log(err)
        });
    }
    findProjects = (name) => {
        if(!name) {
                axios({
                    url:`${server}/api/projects?isAdmin=true`,
                    method:'get',
                    mode:'cors'
                })
                .then(res => this.setState({filteredProjects: res.data.projects}))
                .catch(error => this.setState({error}))
        } else {
            const {projects} = this.state
            this.setState({
                filteredProjects: projects.filter((item) => {
                    return item.name.toLowerCase().includes(name)
                })
            })
        }
    }
}

export default AdminProjectsContent;