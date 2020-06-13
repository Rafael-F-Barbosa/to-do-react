import React from 'react'
import classes from './ProjectForm.module.css'
class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Nome do novo projeto...',
    }
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }
  handleButton = (event) => {
    event.preventDefault();
    this.props.handleAdd(this.state.value);
  }
  render() {
    return (
      <form className={classes.ProjectForm} onSubmit={this.handleButton}>
        <input
          placeholder={this.state.value}
          onChange={this.handleChange}>
        </input>
        <button> add </button>
      </form>
    )
  }
}

export default ProjectForm;