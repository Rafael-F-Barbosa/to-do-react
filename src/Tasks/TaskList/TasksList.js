
import React from 'react'

import TaskElement from '../TaskElement/TaskElement'
import classes from './TaskList.module.css'
const taskList = (props) => (
    <ul className={classes.TaskItems}>
        {
            props.tasks ?
                props.tasks.map((task) =>
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

export default taskList