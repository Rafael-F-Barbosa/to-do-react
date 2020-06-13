import React from 'react';

import TaskDetails from '../TaskDetails/TaskDetails'
import TaskHeader from '../TaskHeader/TaskHeader'
import TasksList from '../TaskList/TasksList'

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

    let shownTaskThing = null;
    
    if (this.state.showList) {
      shownTaskThing = <TasksList
        tasks={this.props.tasks}
        handleRemove={this.handleRemove}
        handleDetails={this.handleDetails}
        handleCheck={this.handleCheck}
      />
    }else{
      if(!this.state.task){
        shownTaskThing = <TaskDetails
              className="task-details"
              whichTask={false}
              handleAdd={this.handleAdd}
              handleDetails={this.handleDetails}
              handleCancel={this.handleDetails}
            />
      }else{
        shownTaskThing = <TaskDetails
              className="task-details"
              whichTask={this.state.task}
              id={this.state.task.id}
              handleUpdate={this.handleUpdate}
              handleDetails={this.handleDetails}
              handleCancel={this.handleDetails}
            />
      }
    }

    return (
      <div className={'tasks'}>
        <TaskHeader
          projectName={this.props.projectName}
          handleNewTask={this.handleNewTask}
          handleBack={this.handleBack}
        />
        {shownTaskThing}
      </div>
    )
  }
}
export default TaskController;