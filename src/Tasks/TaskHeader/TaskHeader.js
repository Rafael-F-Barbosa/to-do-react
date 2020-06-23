import React from 'react'

import classes from './TaskHeader.module.css'

const taskHeader = (props) => (
    <header className={classes.Header}>
        <h2>{props.projectName}</h2>
        <h2>Tasks</h2>
        <button onClick={props.handleNewTask}></button>
        <button onClick={props.handleBack}></button>
    </header>
)

export default taskHeader