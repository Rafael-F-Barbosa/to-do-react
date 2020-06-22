import React from 'react';

import ProjectForm from '../ProjectForm/ProjectForm'
import classes from './Projects.module.css'
import ProjectList from '../ProjectList/ProjectList'

class Projects extends React.Component {
  handleAdd = (name) => {
    this.props.handleAdd(name);
  }
  handleRemove = (id) =>{
    this.props.handleRemove(id);
  }
  handleNav = (id) => {
    this.props.handleNav(id);
  }
  render() {
    return (
      <div className={classes.Projects}>
        <h2>Projects</h2>
        <ProjectForm handleAdd={this.handleAdd} />
        <ProjectList 
        projects={this.props.projects}
        handleRemove={this.handleRemove}
        handleNav={this.handleNav}
        />
      </div>
    )
  }
}

export default Projects;