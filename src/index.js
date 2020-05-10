import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Tasks } from "./tasks";
import { Projects } from "./projects"
import { db } from "./firebase"
import "./reset.css";
import "./style.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCounter: 2,
      idCounterTask: 6,
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
    const projects = this.state.projects;
    const counter = this.state.idCounter + 1;
    projects.push({ name: name, id: this.state.idCounter });
    this.setState({ projects: projects, idCounter: counter });
  }
  handleRemoveProject(id) {
    let projects = this.state.projects;
    projects = projects.filter((project) => Number(project.id) !== Number(id))
    this.setState({ projects: projects })
  }

  handleNavProject(id) {
    let projects = this.state.projects;
    const project = projects.find((project) => Number(project.id) === Number(id));
    this.setState({ shownProject: project });
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
  handleBack() {
    this.setState({ shownProject: null })
  }

  componentDidMount() {
    const projectCol = db.collection('projects');
    const projects = [];
    db.collection('projects').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const projectId = doc.id;
        const tasks = [];
        const project = {
          id: doc.data().id,
          name: doc.data().name,
        }
        projectCol.doc(projectId).collection('tasks').get().then((s) => {
          s.docs.forEach(d => {
            tasks.push(d.data())
          })
        })
        project.tasks = tasks;
        projects.push(project);
      })
      this.setState({ projects: projects })
    });
    // Eu queria desacoplar isso aqui, mas não consigo
    // fazer com que o setState espere o banco de dados
    // ser carregado, resolver depois
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
