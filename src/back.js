import React from 'react';
import ReactDOM from 'react-dom';

import "./reset.css";
import "./index.css";

class TaskElement extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.task;
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleRemove(event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleCheck(event) {
    this.props.handleCheck(event.target.parentElement.getAttribute('data-key'));
  }

  render() {
    const task = this.task;
    return (
      <li data-key={task.id}>
        {
          task.done ?
            <input type="checkbox" onChange={this.handleCheck} defaultChecked /> :
            <input type="checkbox" onChange={this.handleCheck} />
        }
        <p>{task.name}</p>
        <button onClick={this.handleRemove}> delete</button>
      </li>
    )
  }
}

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Nome da nova tarefa...',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleButton(event) {
    event.preventDefault();
    this.props.addElement(this.state.value);
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
  { name: "Tarefa 1", id: 10, done: false },
  { name: "Tarefa 2", id: 11, done: true },
  { name: "Tarefa 3", id: 12, done: false }
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
        { name: 'pojeto1', id: 0, tasks: tasks, idCounter: 13 },
        { name: 'pojeto2', id: 1, tasks: tasks2, idCounter: 3 }
      ],
      shownProject: null,
    }

    this.handleRemove = this.handleRemove.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.handleCheckTask = this.handleCheckTask.bind(this);
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
    console.log(this.state.shownProject);
  }

  handleAddTask(name) {
    const shownProject = this.state.shownProject;
    const tasks = this.state.shownProject.tasks;
    const counter = this.state.shownProject.idCounter + 1;
    tasks.push({ name: name, id: this.state.shownProject.idCounter });
    shownProject['tasks'] = tasks;
    shownProject['idCounter'] = counter;
    this.setState({ shownProject: shownProject });
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
                handleNavigation={this.handleNavigation}
                key={project.id}
              />
            )
          }
        </ol>
        {(this.state.shownProject) ?
          <div className={'tasks'}>
            <h2>Tasks</h2>
            <TaskForm addElement={this.handleAddTask} />
            <ul>
              {this.state.shownProject.tasks.map((task) =>
                <TaskElement
                  task={task}
                  handleRemove={this.handleRemoveTask}
                  handleCheck={this.handleCheckTask}
                  key={task.id}
                />
              )}
            </ul>
          </div> :
          <h3>HAHAHAHAH</h3>
        }
      </div>
    )
  }
}

ReactDOM.render(
  <Projects />,
  document.getElementById('root')
);