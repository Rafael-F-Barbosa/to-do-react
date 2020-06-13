import React from 'react'
import classes from './ProjectElement.module.css'

class ProjectElement extends React.Component {
    handleRemove = (event) => {
        this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
    }
    handleNav = (event) => {
        const element = event.target;
        if (element.classList.contains('delete-btn')) {
            return;
        }
        if (element.getAttribute('data-key'))
            this.props.handleNav(element.getAttribute('data-key'));
        else if (element.parentElement.getAttribute('data-key'))
            this.props.handleNav(element.parentElement.getAttribute('data-key'));
    }
    render() {
        return (
            <li data-key={this.props.project.id}
                className={classes.ProjectElement}
                onClick={this.handleNav}>
                <p>{this.props.project.name}</p>
                <button
                    className={'delete-btn'}
                    onClick={this.handleRemove}>
                    delete
                </button>
            </li>
        )
    }
}


export default ProjectElement;