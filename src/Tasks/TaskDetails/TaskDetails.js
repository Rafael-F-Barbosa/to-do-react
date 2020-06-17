import React from 'react'
import classes from './TaskDetails.module.css'

import Button from '../../UI/Button/Button'
class TaskDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'Nome da nova tarefa...',
        date: new Date(),
        priority: 'low',
      }
    }
    handleChangeName = (event) => {
      this.setState({ name: event.target.value })
    }
    handleChangeDate = (event) => {
      this.setState({ date: event.target.value })
    }
    handleChangePriority = (event) => {
      this.setState({ priority: event.target.value })
    }
    handleButton = (event) => {
      event.preventDefault();
      const whichTask = this.props.whichTask
      if (whichTask) {
        this.props.handleUpdate(this.state, this.props.id);
      } else {
        this.props.handleUpdate(this.state);
      }
      this.props.handleCancel();
  
    }
    handleCancel = (event) => {
      event.preventDefault();
      this.props.handleCancel();
    }
    componentDidMount() {
      const whichTask = this.props.whichTask;
      if (whichTask) {
        this.setState({
          name: whichTask.name,
          date: whichTask.date,
          priority: whichTask.priority
        })
      }
    }
    render() {
      return (
        <form onSubmit={this.handleButton} className={classes.TaskDetails}>
          <label>Name</label>
          {!this.props.whichTask ?
            <input
              placeholder={this.state.name}
              onChange={this.handleChangeName}>
            </input> :
            <input
              value={this.state.name}
              onChange={this.handleChangeName}>
            </input>
          }
          <label>Due date</label>
          <input
            type="date"
            onChange={this.handleChangeDate}>
          </input>
          <label>Priority </label>
          <select value={this.state.priority}
            onChange={this.handleChangePriority}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <div>
            <Button 
            type={"Danger"}
            clicked={this.handleCancel}>cancel</Button>
            <Button clicked={this.handleButton}
            >{!this.props.whichTask ?'add':'update'}
              </Button>
          </div>
        </form>
      )
    }
  }

  export default TaskDetails