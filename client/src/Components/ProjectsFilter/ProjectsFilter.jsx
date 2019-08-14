import React, { Component } from 'react';

class ProjectsFilter extends Component {
    constructor() {
        super();
        this.state = {
            value: 'все',
            active: false
        }
        this.toggleClass= this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    render() {
        return (
            <div className="project-filter">
                <label>Фильтры:</label>
                <button className={`select-filter-button ${this.state.active ? 'active' : null}`} 
                onClick={this.toggleClass}>#{this.state.value}</button>
                <ul value={this.state.value} name="Фильтры">
                    {this.props.filters.map((item, i) => {
                        return <li onClick={() => this.selectValue(item)} key={i} value={item.title}>{item.title}</li>     
                    })}
                </ul>
            </div>
        );
    }

    selectValue = (item) => {
        this.setState({
            value: item.title,
            active: false
        })
        this.props.filterProjects(item.title)
    }
}

export default ProjectsFilter;