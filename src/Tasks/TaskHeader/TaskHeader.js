import React from 'react'

const taskHeader = (props) => (
    <header>
        <h2>{props.projectName}</h2>
        <h2>Tasks</h2>
        <button onClick={props.handleNewTask}></button>
        <button onClick={props.handleBack}></button>
    </header>
)

export default taskHeader