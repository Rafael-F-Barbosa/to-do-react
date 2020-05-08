import React from 'react';

class ProjectElement extends React.Component {
  constructor(props) {
    super(props)
    this.project = this.props.project;

    this.handleRemove = this.handleRemove.bind(this);
    this.handleNavigation = this.handleNav.bind(this);
  }
  handleRemove(event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleNav(event) {
    this.props.handleNav(event.target.parentElement.getAttribute('data-key'));
  }
  render() {
    return (
      <li data-key={this.project.id}
        className={'project-item'}
        onClick={this.handleNavigation}>
        <p>{this.project.name}</p>
        <button onClick={this.handleRemove}> delete</button>
      </li>
    )
  }
}

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Nome do novo projeto...',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleButton(event) {
    event.preventDefault();
    this.props.handleAdd(this.state.value);
  }
  render() {
    return (
      <form onSubmit={this.handleButton}>
        <input
          placeholder={this.state.value}
          onChange={this.handleChange}>
        </input>
        <button> add </button>
      </form>
    )
  }
}
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }
  handleAdd(name) {
    this.props.handleAdd(name);
  }
  handleRemove(id) {
    this.props.handleRempve(id);
  }
  handleNav(id) {
    this.props.handleNav(id);
  }
  render() {
    return (
      <div className={"projects"}>
        <h2>Projects</h2>
        <ProjectForm handleAdd={this.handleAddProject} />
        <ol>
          {
            this.props.projects.map((project) =>
              <ProjectElement
                className={"project-item"}
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

export {Projects};