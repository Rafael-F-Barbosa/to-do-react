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
    const id = event.target.parentElement.getAttribute('data-key');
    this.props.handleDetails(this.task, id);
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
      name: 'Nome da nova tarefa...',
      date: new Date(),
      priority: 'low',
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleButton = this.handleButton.bind(this);

    this.handleDetails = this.handleDetails.bind(this);
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
  handleButton(event, id) {
    event.preventDefault();
    const whichTask = this.props.whichTask
    if (whichTask){
      console.log(this.props.id)
      this.props.handleUpdate(this.state, this.props.id);
    }else{
      this.props.handleAdd(this.state);
    }
  }
  handleDetails(event) {
    event.preventDefault();
    this.props.handleDetails(this.task);
    console.log('la la la la')
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
    // console.log(this.props.whichTask)
    return (
      <form className={this.props.className} onSubmit={this.handleButton}>
        <label>Name</label>
        <input
          value={this.state.name}
          onChange={this.handleChangeName}>
        </input>
        <label>Due date</label>
        <input
          type="date"
          value={this.state.date}
          onChange={this.handleChangeDate}
        >
        </input>
        <label>Priority </label>
        <select value={this.state.priority}
          onChange={this.handleChangePriority}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <div>
          <button onClick={this.handleDetails} className='btn-cancel'>cancel</button>
          {!this.props.whichTask ?
            <button className="btn-add">add</button> :
            <button className="btn-add">update</button>
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
  }
  handleAdd(task) {
    this.props.handleAdd(task);
  }
  handleUpdate(task, id){
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
  handleDetails(task, id) {
    const show = this.state.showList;
    if(task){ task.id =  id}
    this.setState({ showList: !show, task: task })
  }
  render() {
    return (
      <div className={'tasks'}>
        <header>
          <h2>{this.props.projectName}</h2>
          <h2>Tasks</h2>
          <button onClick={this.handleBack}></button>
        </header>
        {(this.state.showList) ?
          <ul>
            {
              this.props.tasks ?
                this.props.tasks.map((task) =>
                  <TaskElement
                    task={task}
                    className={"task-item"}
                    handleRemove={this.handleRemove}
                    handleCheck={this.handleCheck}
                    handleDetails={this.handleDetails}
                    key={task.id}
                  />
                ) :
                <h2>No tasks to show.</h2>
            }
          </ul> :
          (!this.state.task) ?
            <TaskDetails
              className="task-details"
              handleAdd={this.handleAdd}
              handleDetails={this.handleDetails}
            /> :
            <TaskDetails
              className="task-details"
              handleUpdate={this.handleUpdate}
              handleDetails={this.handleDetails}
              whichTask={this.state.task}
              id={this.state.task.id}
            />
        }
      </div>
    )
  }
}

export { Tasks };