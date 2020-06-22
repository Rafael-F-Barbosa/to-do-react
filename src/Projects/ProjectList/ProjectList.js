import React from 'react'
import ProjectElement from '../ProjectElement/ProjectElement'


const projectList = (props) => {
    return (
        <ol>
            {
                props.projects.map((project) =>
                    <ProjectElement
                        project={project}
                        handleRemove={props.handleRemove}
                        handleNav={props.handleNav}
                        key={project.id}
                    />
                )
            }
        </ol>
    )
}

export default projectList