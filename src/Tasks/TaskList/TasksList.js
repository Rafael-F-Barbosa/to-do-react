
import React from 'react'

import TaskElement from '../TaskElement/TaskElement'

const taskList = (props) => (
    <ul>
        {
            props.tasks ?
                props.tasks.map((task) =>
                    <TaskElement
                        key={task.id}
                        task={task}
                        className={"task-item"}
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