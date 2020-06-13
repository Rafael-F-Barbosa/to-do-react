import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import  Tasks  from "./Tasks/TaskController";
import { Projects } from "./projects";
import { dataHandler } from "./firebase";
import "./reset.css";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      shownProject: null,
    };
    this.handleRemoveProject = this.handleRemoveProject.bind(this);
    this.handleNavProject = this.handleNavProject.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.handleCheckTask = this.handleCheckTask.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleAddProject(name) {
    dataHandler.saveProjects({ name: name }).then((result) => {
      const projects = this.state.projects;
      projects.push({ name: name, id: result });
      this.setState({ projects: projects });
    })
  }
  handleRemoveProject(id) {
    let projects = this.state.projects;
    projects = projects.filter((project) => String(project.id) !== String(id));
    this.setState({ projects: projects });
    dataHandler.deleteProject(id);
  }

  handleNavProject(id) {
    let projects = this.state.projects;
    const project = projects.find((project) => String(project.id) === String(id));
    this.setState({ shownProject: project });
  }

  handleAddTask(task) {
    const shownProject = {...this.state.shownProject};
    const tasks = [...this.state.shownProject.tasks] || [];
    dataHandler
      .saveTasks(shownProject, {
        name: task.name,
        date: task.date,
        priority: task.priority,
        done: false
      })
      .then((result) => {
        tasks.push({
          name: task.name,
          date: task.date,
          priority: task.priority,
          id: result.taskId,
          done: false
        });
        shownProject.tasks = tasks;
        shownProject.id = result.projectId;
        this.setState({
          shownProject: shownProject,
          // idCounterTask: result
        });
      })
  }
  handleUpdateTask(task, taskId) {
    const shownProject = {...this.state.shownProject};
    let tasks = [...shownProject.tasks];

    const index = tasks.findIndex((t) => String(t.id) === String(taskId));
    let updatedTask = tasks[index];

    updatedTask.name = task.name;
    updatedTask.date = task.date;
    updatedTask.priority = task.priority;

    tasks.splice(index, 1, updatedTask);
    shownProject.tasks = tasks;

    this.setState({ shownProject: shownProject });

    dataHandler.updateTask(shownProject.id, taskId, updatedTask);

  }
  handleRemoveTask(id) {
    const shownProject = this.state.shownProject;
    let tasks = this.state.shownProject.tasks;
    tasks = tasks.filter((task) => String(task.id) !== String(id));
    shownProject.tasks = tasks;
    this.setState({ shownProject: shownProject });
    dataHandler.deleteTask(shownProject.id, id);
  }
  handleCheckTask(id) {
    const shownProject = this.state.shownProject;
    let tasks = this.state.shownProject.tasks;
    let task = tasks.find((task) => String(task.id) === String(id));
    task.done = !task.done;
    shownProject.tasks = tasks;
    this.setState({ shownProject: shownProject });
    dataHandler.updateTask(shownProject.id, id, task)
  }
  handleBack() {
    this.setState({ shownProject: null });
  }

  componentDidMount() {
    dataHandler.getProjects().then((result) => {
      this.setState({ projects: result });
    })
  }
  componentDidUpdate(){
    console.log('Did Update')
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
            handleUpdate={this.handleUpdateTask}
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


// Improvement -> alert the user when the conection 
// with the firestore fails

// Improvement -> improve the form of task creation,
// with some data validation... etc

// Improvement -> risk text and change text background
// when a task is completed

// Improvement -> Use some way to sort tasks and projects






