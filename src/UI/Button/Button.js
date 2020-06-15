import React from 'react'
import classes from './Button.module.css'

const button = (props) => {
    let classesNames = classes.Button
    if (props.type) {
        classesNames = [classes.Button, classes[props.type]].join(' ')
    }
    return (<button
        id={'button'}
        onClick={props.clicked}
        className={classesNames}>
        {props.children}
    </button>)
}
export default button;