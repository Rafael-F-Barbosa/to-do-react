import React from 'react';

class TaskElement extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.task;
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

    this.handleDetails = this.handleDetails.bind(this);
  }
  handleRemove(event) {
    this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
  }
  handleCheck(event) {
    this.props.handleCheck(event.target.parentElement.getAttribute('data-key'));
  }

  handleDetails(event) {
    console.log(event)
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
        <button className={"btn-details"} onClick={this.handleDetails}>details</button>
        <button onClick={this.handleRemove}>delete</button>
      </li>
    )
  }
}
class TaskDetails extends React.Component {
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
      <form className={this.props.className} onSubmit={this.handleButton}>
        <label>Name</label>
        <input
          placeholder={this.state.value}
          onChange={this.handleChange}>
        </input>
        <label>Due date</label>
        <input
          type="date"
        >
        </input>
        <label>Priority </label>
        <select>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <div>
          <button className='btn-cancel'>cancel</button>
          <button className="btn-add">add</button>
        </div>
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
    this.handleBack = this.handleBack.bind(this);
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
  handleBack() {
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
        <ul>
          {
            this.props.tasks ?
              this.props.tasks.map((task) =>
                <TaskElement
                  task={task}
                  className={"task-item"}
                  handleRemove={this.handleRemove}
                  handleCheck={this.handleCheck}
                  key={task.id}
                />
              ) :
              <h2>No tasks to show.</h2>
          }
        </ul>
        <TaskDetails className="task-details" addElement={this.handleAdd} />
      </div>
    )
  }
}

export { Tasks };