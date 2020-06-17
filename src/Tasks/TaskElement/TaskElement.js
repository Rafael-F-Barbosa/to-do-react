import React from 'react';
import Button from '../../UI/Button/Button'
import classes from './TaskElement.module.css'

// Esse código tá zero reutilizávelm eu deveria receber essa info fo pai que chama o Task Element

class TaskElement extends React.Component {
  handleRemove = (event) => {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleCheck = (event) => {
    this.props.handleCheck(event.target.parentElement.getAttribute('data-key'));
  }
  handleDetails = (event) => {
    this.props.handleDetails(this.props.task, event.target.parentElement.parentElement.getAttribute('data-key'));
  }
  render() {
    const task = this.props.task;
    let apliedClasses = classes.TaskElement;
    if (task.done) {
      apliedClasses = [classes.TaskElement, classes.Done].join(' ');
    }
    return (
      <li className={apliedClasses} data-key={task.id}>

        {
          <input className={classes.Checkbox} id="checkbox" type="checkbox" onChange={this.handleCheck} defaultChecked={task.done} />
        }
        <label htmlFor="checkbox"></label>

        <p>{task.name}</p>
        <div>
          <Button clicked={this.handleDetails} type={null}>details</Button>
          <Button clicked={this.handleRemove} type='Danger'>delete</Button>
        </div>
      </li>
    )
  }
}
export default TaskElement