import React from 'react';

import ProjectElement from '../ProjectElement/ProjectElement'
import ProjectForm from '../ProjectForm/ProjectForm'
import classes from './Projects.module.css'
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
        <ol>
          {
            this.props.projects.map((project) =>
              <ProjectElement
                project={project}
                handleRemove={this.handleRemove}
                handleNav={this.handleNav}
                key={project.id}
              />
            )
          }
        </ol>
      </div>
    )
  }
}

export default Projects;