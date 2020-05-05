import React from 'react';
import ReactDOM from 'react-dom';
import "./reset.css";
import "./index.css";

class TaskElement extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.task;
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }

  render() {
    const task = this.task;
    return (
      <li data-key={task.id}>
        <button> X </button>
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
      value: 'Nome da tarefa',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleButton(event) {
    event.preventDefault();
    this.props.addElement(this.state.value);
  }
  render() {
    return (
      <form onSubmit={this.handleButton}>
        <input
          value={this.state.value}
          onChange={this.handleChange}>
        </input>
        <button> add </button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCounter: 3,
      tasks: [{ name: "Tarefa 1", id: 0 }, { name: "Tarefa 2", id: 1 }, { name: "Tarefa 3", id: 2 }]
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleAdd(name) {
    const tasks = this.state.tasks;
    const counter = this.state.idCounter + 1;
    tasks.push({ name: name, id: this.state.idCounter });
    this.setState({ tasks: tasks, idCounter: counter });
  }
  handleRemove(id) {
    let tasks = this.state.tasks;
    tasks = tasks.filter((task) => Number(task.id) !== Number(id))
    this.setState({ tasks: tasks });
  }
  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <TaskForm addElement={this.handleAdd} />
        <ul>
          {this.state.tasks.map((task) =>
            <TaskElement
              task={task}
              handleRemove={this.handleRemove}
              key={task.id}
            />
          )}

        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <App name="Rafael" />,
  document.getElementById('root')
);