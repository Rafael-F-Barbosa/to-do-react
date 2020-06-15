import React from 'react';
import Button from '../../UI/Button/Button'
import classes from './TaskElement.module.css'

class TaskElement extends React.Component {
  handleRemove = (event) => {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleCheck = (event) => {
    this.props.handleCheck(event.target.parentElement.getAttribute('data-key'));
  }
  handleDetails = (event) => {
    const taksId = event.target.parentElement.getAttribute('data-key');
    this.props.handleDetails(this.props.task, taksId);
  }
  render() {
    const task = this.props.task;
    return (
      <li className={classes.TaskElement} data-key={task.id}>
        {
          task.done ?
            <input type="checkbox" onChange={this.handleCheck} defaultChecked /> :
            <input type="checkbox" onChange={this.handleCheck} />
        }
        <p>{task.name}</p>
        <Button clicked={this.handleDetails} type={null}>details</Button>
        <Button clicked={this.handleRemove} type='Danger'>delete</Button>
      </li>
    )
  }
}
export default TaskElement