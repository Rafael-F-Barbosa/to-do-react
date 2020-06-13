import React from 'react';



class TaskElement extends React.Component {
    constructor(props) {
      super(props);
      this.task = this.props.task;
    }
    handleRemove = (event) => {
      this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
    }
    handleCheck = (event) => {
      this.props.handleCheck(event.target.parentElement.getAttribute('data-key'));
    }
    handleDetails = (event) => {
      const taksId = event.target.parentElement.getAttribute('data-key');
      this.props.handleDetails(this.task, taksId);
    }
    render() {
      const task = this.task;
      return (
        <li className={this.props.className} data-key={task.id}>
          {
            task.done ?
              <input type="checkbox" onChange={this.handleCheck} defaultChecked /> :
              <input type="checkbox" onChange={this.handleCheck} />
          }
          <p>{task.name}</p>
          <button onClick={this.handleDetails} className={"btn-details"}>details</button>
          <button onClick={this.handleRemove}>delete</button>
        </li>
      )
    }
  }

  export default TaskElement