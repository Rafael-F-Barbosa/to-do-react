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
  }
  handleRemove(event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }

  render() {
    return (
      <li data-key={this.project.id} className={'project-item'}>
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
  { name: "Tarefa 4", id: 0, done: false },
  { name: "Tarefa 5", id: 1, done: false },
  { name: "Tarefa 6", id: 2, done: true }
];

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.something = 'a';
    this.state = {
      idCounter: 2,
      projects: [
        { name: 'pojeto1', id: 0, tasks: tasks },
        { name: 'pojeto2', id: 1, tasks: tasks2 }
      ]

    }

    this.handleRemove = this.handleRemove.bind(this);
    this.handleTasks = this.handleTasks.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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
  handleTasks(event) {
    console.log(event.target);
  }


  render() {
    return (
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
                key={project.id}
              />
            )
          }
        </ol>
        {/* <Task tasks={this.state.projects[1].tasks} className={taskClass} /> */}
      </div>
    )
  }
}
ReactDOM.render(
  <Projects />,
  document.getElementById('root')
);