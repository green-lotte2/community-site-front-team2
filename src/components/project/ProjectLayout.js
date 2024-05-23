import React from 'react'
import { Link } from 'react-router-dom'

const ProjectLayout = () => {
  return (
    <div className='ProjectList'>
        <h2 className="title"> Project </h2>
        <div class="Project">
            <ul>
                <li><Link to='/project/overview'>Overview</Link></li>
                <li><a href='/project/Tasks'>Tasks</a></li>
                <li><a href='/project/Documents'>Documents</a></li>
                <li><a href='/project/Team'>Team</a></li>
                <li><a href='/project/Report'>Report</a></li>
                <li><a href='/project/Admin'>Admin</a></li>
            </ul>
        </div>
    </div>

  )
}

export default ProjectLayout