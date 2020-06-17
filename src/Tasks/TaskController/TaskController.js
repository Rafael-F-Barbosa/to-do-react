import React from 'react';

import TaskDetails from '../TaskDetails/TaskDetails'
import TaskHeader from '../TaskHeader/TaskHeader'
import TasksList from '../TaskList/TasksList'
import classes from './TaskController.module.css';

class TaskController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
      task: null,
    }
  }
  handleAdd = (task) => {
    this.props.handleAdd(task);
  }
  handleUpdate = (task, id) => {
    console.log('\n\nid:', id)
    this.props.handleUpdate(task, id);
  }
  handleRemove = (id) => {
    this.props.handleRemove(id);
  }
  handleCheck = (id) => {
    this.props.handleCheck(id)
  }
  handleBack = () => {
    this.props.handleBack();
  }
  handleDetails = (task = null, id) => {
    if (task) {
      task.id = id
    }
    this.setState({ showList: !this.state.showList, task: task })
  }
  handleNewTask = () => {
    this.setState({ showList: !this.state.showList, task: null })
  }
  render() {

    let taskListOrDetails = null;

    if (this.state.showList) {
      taskListOrDetails =
        <TasksList
          tasks={this.props.tasks}
          handleRemove={this.handleRemove}
          handleDetails={this.handleDetails}
          handleCheck={this.handleCheck}
        />
    } else {
      taskListOrDetails =
        <TaskDetails
          whichTask={this.state.task}
          id={this.state.task?this.state.task.id:null}
          handleUpdate={this.state.task?this.handleUpdate:this.handleAdd}
          handleDetails={this.handleDetails}
          handleCancel={this.handleDetails}
        />
    }


    return (
      <div className={classes.Tasks}>
        <TaskHeader
          projectName={this.props.projectName}
          handleNewTask={this.handleNewTask}
          handleBack={this.handleBack}
        />
        {taskListOrDetails}
      </div>
    )
  }
}
export default TaskController;