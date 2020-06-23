
import React from 'react'

import TaskElement from '../TaskElement/TaskElement'
import classes from './TaskList.module.css'
const taskList = (props) => {
    let tasks = props.tasks;
    if (tasks) {
        const tasksOrderedByName =
            tasks.sort((a, b) => a.name < b.name ? 1 : -1)
        const tasksOrderedByDone =
            tasksOrderedByName.sort((a) => a.done ? 1 : -1)
        tasks = tasksOrderedByDone;
    }
    return (
        <ul className={classes.TaskItems}>
            {
                (tasks) ?
                    tasks.map((task) =>
                        <TaskElement
                            key={task.id}
                            task={task}
                            handleRemove={props.handleRemove}
                            handleCheck={props.handleCheck}
                            handleDetails={props.handleDetails}
                        />
                    ) :
                    <h2>No tasks to show.</h2>
            }
        </ul>
    )
}

export default taskList