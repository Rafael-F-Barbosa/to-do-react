import React from 'react';
import Button from '../../UI/Button/Button'
import classes from './TaskElement.module.css'

// Esse código tá zero reutilizávelm eu deveria receber essa info fo pai que chama o Task Element

class TaskElement extends React.Component {
  handleRemove = (event) => {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
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
        
        <div className={classes.Title}>
          <p>{task.name}</p>
        </div>

        <div className={classes.Status}>
          <label>Status: </label>
          {
            task.done ?
              <p onClick={() => this.props.handleCheck(task.id)}>DONE</p> :
              <p onClick={() => this.props.handleCheck(task.id)}>TO DO</p>
          }
        </div>
        
        <div>
          <label>Date: </label>
          <p>{task.date.seconds?task.date.seconds:null}</p>
        </div>

        <div>
          <label>Priority: </label>
          <p>{task.priority}</p>
        </div>

        <div>
          <Button clicked={this.handleDetails} type={null}>edit</Button>
          <Button clicked={this.handleRemove} type='Danger'>delete</Button>
        </div>
      </li>
    )
  }
}
export default TaskElement