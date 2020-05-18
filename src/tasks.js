import React from 'react';
class TaskElement extends React.Component {
  constructor(props) {
    super(props);
    this.task = this.props.task;
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
class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Nome da nova tarefa...',
      date: new Date(),
      priority: 'low',
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleChangeName(event) {
    this.setState({ name: event.target.value })
  }
  handleChangeDate(event) {
    this.setState({ date: event.target.value })
  }
  handleChangePriority(event) {
    this.setState({ priority: event.target.value })
  }
  handleButton(event) {
    event.preventDefault();
    const whichTask = this.props.whichTask
    if (whichTask) {
      this.props.handleUpdate(this.state, this.props.id);
    } else {
      this.props.handleAdd(this.state);
    }
    this.props.handleCancel();

  }
  handleCancel(event) {
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
      <form onSubmit={this.handleButton} className={this.props.className}>
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
          <input type="click"
            onClick={this.handleCancel}
            className='btn-cancel' defaultValue="cancel">
          </input>

          {!this.props.whichTask ?
            <input type="submit"
              onClick={this.handleButton}
              className="btn-add"
              value="add">
            </input> :
            <input type="submit"
              onClick={this.handleButton}
              className="btn-add"
              value="update">
            </input>
          }
        </div>
      </form>
    )
  }
}

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
      task: null,
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
  }
  handleAdd(task) {
    this.props.handleAdd(task);
  }
  handleUpdate(task, id) {
    this.props.handleUpdate(task, id);
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
  handleDetails(task = null, id) {
    if (task) {
      task.id = id
    }
    this.setState({ showList: !this.state.showList, task: task })
  }
  handleNewTask() {
    this.setState({ showList: !this.state.showList, task: null })
  }
  render() {
    return (
      <div className={'tasks'}>
        <header>
          <h2>{this.props.projectName}</h2>
          <h2>Tasks</h2>
          <button onClick={this.handleNewTask}></button>
          <button onClick={this.handleBack}></button>
        </header>
        {(this.state.showList) ?
          <ul>
            {
              this.props.tasks ?
                this.props.tasks.map((task) =>
                  <TaskElement
                    key={task.id}
                    task={task}
                    className={"task-item"}
                    handleRemove={this.handleRemove}
                    handleCheck={this.handleCheck}
                    handleDetails={this.handleDetails}
                  />
                ) :
                <h2>No tasks to show.</h2>
            }
          </ul> :
          (!this.state.task) ?
            <TaskDetails
              className="task-details"
              whichTask={false}
              handleAdd={this.handleAdd}
              handleDetails={this.handleDetails}
              handleCancel={this.handleDetails}
            /> :
            <TaskDetails
              className="task-details"
              whichTask={this.state.task}
              id={this.state.task.id}
              handleUpdate={this.handleUpdate}
              handleDetails={this.handleDetails}
              handleCancel={this.handleDetails}
            />
        }
      </div>
    )
  }
}
export { Tasks };