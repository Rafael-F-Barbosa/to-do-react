import React from 'react'
import classes from './Button.module.css'

const button = (props) => {
    let classesNames = classes.Button
    let type = 'submit';
    if (props.type) {
        classesNames = [classes.Button, classes[props.type]].join(' ')
        type = 'button';
    }
    return (
    <button
        type={type}
        id={'button'}
        onClick={props.clicked}
        className={classesNames}>
        {props.children}
    </button>)
}
export default button;