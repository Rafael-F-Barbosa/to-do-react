import React from 'react';
import ReactDOM from 'react-dom';
import { Task } from "./task";

import "./reset.css";
import "./index.css";

class ProjectElement extends React.Component {
  constructor(props) {
    super(props)
    this.project = this.props.project;

    this.handleRemove = this.handleRemove.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);

  }

  handleRemove(event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleNavigation(event) {
    this.props.handleNavigation(event.target.parentElement.getAttribute('data-key'));
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

const tasks = [
  { name: "Tarefa 1", id: 0, done: false },
  { name: "Tarefa 2", id: 1, done: true },
  { name: "Tarefa 3", id: 2, done: false }
];
const tasks2 = [
  { name: "Tarefa 4", id: 3, done: false },
  { name: "Tarefa 5", id: 4, done: false },
  { name: "Tarefa 6", id: 5, done: true }
];

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.something = 'a';
    this.state = {
      idCounter: 2,
      idCounterTask: 6,
      projects: [
        { name: 'pojeto1', id: 0, tasks: tasks },
        { name: 'pojeto2', id: 1, tasks: tasks2 }
      ],
      shownProject: null,
    }

    this.handleRemove = this.handleRemove.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.handleCheckTask = this.handleCheckTask.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleAdd(name) {
    const projects = this.state.projects;
    const counter = this.state.idCounter + 1;
    projects.push({ name: name, id: this.state.idCounter });
    this.setState({ projects: projects, idCounter: counter });
  }
  handleRemove(id) {
    let projects = this.state.projects;
    projects = projects.filter((project) => Number(project.id) !== Number(id))
    this.setState({ projects: projects })
  }

  handleNavigation(id) {
    let projects = this.state.projects;
    const project = projects.find((project) => Number(project.id) === Number(id))
    this.setState({ shownProject: project })
  }

  handleAddTask(name) {
    const shownProject = this.state.shownProject;
    const tasks = this.state.shownProject.tasks || [];
    const counter = this.state.idCounterTask + 1;
    tasks.push({ name: name, id: this.state.idCounterTask });
    shownProject['tasks'] = tasks;
    shownProject['idCounter'] = counter;
    this.setState({ shownProject: shownProject, idCounterTask: counter });
  }
  handleRemoveTask(id) {
    const shownProject = this.state.shownProject;
    let tasks = this.state.shownProject.tasks;
    tasks = tasks.filter((task) => Number(task.id) !== Number(id))
    shownProject['tasks'] = tasks;
    this.setState({ shownProject: shownProject });
  }
  handleCheckTask(id) {
    const shownProject = this.state.shownProject;
    let tasks = this.state.shownProject.tasks;
    let task = tasks.find((task) => Number(task.id) === Number(id))
    task.done = !task.done
    shownProject['tasks'] = tasks;
    this.setState({ shownProject: shownProject });
  }
  handleBack(){
    this.setState({shownProject: null})
  }

  render() {
    return (
      (this.state.shownProject) ?
        <Task
          projectName={this.state.shownProject.name}
          tasks={this.state.shownProject.tasks}
          className={'tasks'}
          handleAdd={this.handleAddTask}
          handleRemove={this.handleRemoveTask}
          handleCheck={this.handleCheckTask}
          handleBack={this.handleBack}
        /> :
        <div className={"projects"}>
          <h2>Projects</h2>
          <ProjectForm handleAdd={this.handleAdd} />
          <ol>
            {
              this.state.projects.map((project) =>
                <ProjectElement
                  className={"project-item"}
                  project={project}
                  handleRemove={this.handleRemove}
                  handleNavigation={this.handleNavigation}
                  key={project.id}
                />
              )
            }
          </ol>
        </div>
    )
  }
}

ReactDOM.render(
  <Projects />,
  document.getElementById('root')
);