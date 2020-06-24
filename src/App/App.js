import React from 'react';
import TaskController from "../Tasks/TaskController/TaskController";
import Aux from '../hoc/Aux'
import MainHeader from '../UI/MainHeader/MainHeader'
import Projects from "../Projects/Projects/Projects";
import dataHandler from "../firebase";
import "./reset.css";
import "./App.css";
import classes from './Error.module.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            shownProject: null,
            firebaseError: false,
        };
    }
    handleAddProject = (name) => {
        dataHandler.saveProjects({ name: name }).then((result) => {
            const projects = this.state.projects;
            projects.push({ name: name, id: result });
            this.setState({ projects: projects });
        })
    }
    handleRemoveProject = (id) => {
        let projects = this.state.projects;
        projects = projects.filter((project) => String(project.id) !== String(id));
        this.setState({ projects: projects });
        dataHandler.deleteProject(id);
    }

    handleNavProject = (id) => {
        let projects = this.state.projects;
        const project = projects.find((project) => String(project.id) === String(id));
        this.setState({ shownProject: project });
    }

    handleAddTask = (task) => {
        const shownProject = { ...this.state.shownProject };
        const tasks = shownProject.tasks || [];

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
                });
            })
    }


    handleUpdateTask = (task, taskId) => {
        const shownProject = { ...this.state.shownProject };
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
    handleRemoveTask = (id) => {
        const shownProject = this.state.shownProject;
        let tasks = this.state.shownProject.tasks;
        tasks = tasks.filter((task) => String(task.id) !== String(id));
        shownProject.tasks = tasks;
        this.setState({ shownProject: shownProject });
        dataHandler.deleteTask(shownProject.id, id);
    }
    handleCheckTask = (id) => {
        const shownProject = this.state.shownProject;
        let tasks = this.state.shownProject.tasks;
        let task = tasks.find((task) => String(task.id) === String(id));
        task.done = !task.done;
        shownProject.tasks = tasks;
        this.setState({ shownProject: shownProject });
        dataHandler.updateTask(shownProject.id, id, task)
    }
    handleBack = () => {
        this.setState({ shownProject: null });
    }

    componentDidMount() {
        dataHandler.getProjects().then((result) => {
            this.setState({ projects: result });
            this.setState({ firebaseError: false });
        }).catch((err) => {
            this.setState({ firebaseError: true });
        })
    }
    render() {
        const appController = (this.state.shownProject) ?
            <TaskController
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
        return (
            <Aux>
                <MainHeader />
                {!this.state.firebaseError ?
                    appController :
                    <div className={classes.Error}>
                        <p>
                            Problem reaching firebase.
                        </p>
                        <p>Reload the page and verify your conection.</p>
                    </div>

                }

            </Aux>
        )
    }
}

export default App;


