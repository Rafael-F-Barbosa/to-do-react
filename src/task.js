import React from 'react';
import "./reset.css";
import "./index.css";

class TaskElement extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.task;
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck  = this.handleCheck.bind(this);
  }
  handleRemove (event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleCheck (event) {
    this.props.handleCheck(event.target.parentElement.getAttribute('data-key'));
  }

  render() {
    const task = this.task;
    return (
      <li data-key={task.id}>
        {
          task.done ?
          <input type="checkbox" onChange={this.handleCheck} defaultChecked/>:
          <input type="checkbox" onChange={this.handleCheck}/>
        }
        <p>{task.name}</p>
        <button onClick={this.handleRemove}> delete</button>
      </li>
    )
  }
}
class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Nome da nova tarefa...',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }
  handleChange (event) {
    this.setState({ value: event.target.value })
  }
  handleButton (event) {
    event.preventDefault();
    this.props.addElement(this.state.value);
  }
  render() {
    return (
      <form onSubmit={this.handleButton}>
        <input
          placeholder={this.state.value}
          onChange={this.handleChange}>
        </input>
        <button> add </button>
      </form>
    )
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCounter: 3,
      tasks: props.tasks,
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleAdd (name) {
    const tasks = this.state.tasks;
    const counter = this.state.idCounter + 1;
    tasks.push({ name: name, id: this.state.idCounter });
    this.setState({ tasks: tasks, idCounter: counter });
  }
  handleRemove (id) {
    let tasks = this.state.tasks;
    tasks = tasks.filter((task) => Number(task.id) !== Number(id))
    this.setState({ tasks: tasks });
  }
  handleCheck (id) {
    let tasks = this.state.tasks;
    let task = tasks.find((task)=>Number(task.id)===Number(id))
    task.done = !task.done
    this.setState({ tasks: tasks });
  }
  render() {
    return (
      <div className={this.props.className}>
        <h2>Tasks</h2>
        <TaskForm addElement={this.handleAdd} />
        <ul>
          {this.state.tasks.map((task) =>
            <TaskElement
              task={task}
              handleRemove={this.handleRemove}
              handleCheck={this.handleCheck}
              key={task.id}
            />
          )}

        </ul>
      </div>
    )
  }
}


export {Task}