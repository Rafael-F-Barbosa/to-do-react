import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Tasks } from "./tasks";
import { Projects } from "./projects"
import { getProjects, saveProjects, saveTasks } from "./firebase"
import "./reset.css";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      shownProject: null,
    }

    this.handleRemoveProject = this.handleRemoveProject.bind(this);
    this.handleNavProject = this.handleNavProject.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.handleCheckTask = this.handleCheckTask.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleAddProject(name) {
    saveProjects({ name: name }).then((result) => {
      const projects = this.state.projects;
      projects.push({ name: name, id: result });
      this.setState({ projects: projects });
    })
  }
  handleRemoveProject(id) {
    let projects = this.state.projects;
    projects = projects.filter((project) => String(project.id) !== String(id))
    this.setState({ projects: projects })
  }

  handleNavProject(id) {
    let projects = this.state.projects;
    const project = projects.find((project) => String(project.id) === String(id));
    this.setState({ shownProject: project });
  }

  handleAddTask(name) {
    const shownProject = this.state.shownProject;
    const tasks = this.state.shownProject.tasks || [];
    saveTasks(shownProject, { name: name }).then((result)=>{
      tasks.push({ name: name, id: result, done: false});
      shownProject.tasks = tasks;
      shownProject.id = result;
      this.setState({
        shownProject: shownProject,
        idCounterTask: result
      });
    })
  }
  handleRemoveTask(id) {
    const shownProject = this.state.shownProject;
    let tasks = this.state.shownProject.tasks;
    tasks = tasks.filter((task) => String(task.id) !== String(id))
    shownProject.tasks = tasks;
    this.setState({ shownProject: shownProject });
  }
  handleCheckTask(id) {
    const shownProject = this.state.shownProject;
    let tasks = this.state.shownProject.tasks;
    let task = tasks.find((task) => String(task.id) === String(id))
    task.done = !task.done
    shownProject.tasks = tasks;
    this.setState({ shownProject: shownProject });
  }
  handleBack() {
    this.setState({ shownProject: null })
  }

  componentDidMount() {
    getProjects().then((result) => {
      this.setState({ projects: result })
    })
  }
  render() {
    return (
      <Fragment>
        <h1>To-do-App</h1>
        {(this.state.shownProject) ?
          <Tasks
            projectName={this.state.shownProject.name}
            tasks={this.state.shownProject.tasks}
            handleAdd={this.handleAddTask}
            handleRemove={this.handleRemoveTask}
            handleCheck={this.handleCheckTask}
            handleBack={this.handleBack} /> :
          <Projects
            projects={this.state.projects}
            handleAdd={this.handleAddProject}
            handleRemove={this.handleRemoveProject}
            handleNav={this.handleNavProject}
          />
        }
      </Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
