import React from 'react'
import classes from './ProjectElement.module.css'
import Button from '../../UI/Button/Button'

class ProjectElement extends React.Component {
    handleRemove = (event) => {
        this.props.handleRemove(event.target.parentElement.getAttribute('data-key'));
    }
    handleNav = (event) => {
        const element = event.target;
        if (element.id === 'button') {
            return;
        }
        if (element.getAttribute('data-key'))
            this.props.handleNav(this.props.project.id);
        else if (element.parentElement.getAttribute('data-key'))
            this.props.handleNav(this.props.project.id);
    }
    render() {
        const projectId = this.props.project.id;
        return (
            <li data-key={projectId}
                className={classes.ProjectElement}
                onClick={this.handleNav}>
                <p>{this.props.project.name}</p>
                <div>
                    <Button
                        type={'Danger'}
                        clicked={()=>this.props.handleRemove(projectId)}
                    >delete</Button>
                </div>
            </li>
        )
    }
}


export default ProjectElement;