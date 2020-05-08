import React from 'react';

class TaskElement extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.task;
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleRemove(event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleCheck(event) {
    this.props.handleCheck(event.target.parentElement.getAttribute('data-key'));
  }

  render() {
    const task = this.task;
    return (
      <li data-key={task.id}>
        {
          task.done ?
            <input type="checkbox" onChange={this.handleCheck} defaultChecked /> :
            <input type="checkbox" onChange={this.handleCheck} />
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
          placeholder={this.state.value}
          onChange={this.handleChange}>
        </input>
        <button> add </button>
      </form>
    )
  }
}

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleBack  = this.handleBack.bind(this);
  }
  handleAdd(name) {
    this.props.handleAdd(name);
  }
  handleRemove(id) {
    this.props.handleRemove(id);
  }
  handleCheck(id) {
    this.props.handleCheck(id)
  }
  handleBack(){
    this.props.handleBack();
  }
  render() {
    return (
      <div className={'tasks'}>
        <header>
          <h2>{this.props.projectName}</h2>
          <h2>Tasks</h2>
          <button onClick={this.handleBack}></button>
        </header>
        <TaskForm addElement={this.handleAdd} />
        <ul>
          {
            this.props.tasks ?
              this.props.tasks.map((task) =>
                <TaskElement
                  task={task}
                  handleRemove={this.handleRemove}
                  handleCheck={this.handleCheck}
                  key={task.id}
                />
              ) :
              <h2>No tasks to show.</h2>
          }
        </ul>
      </div>
    )
  }
}

export { Tasks };