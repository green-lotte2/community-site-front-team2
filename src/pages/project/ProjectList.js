import React, { useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import ProjectList from '../../components/project/ProjectList'
import ProjectLayout from '../../components/project/ProjectLayout'
import SearchBar from '../../components/project/SearchBar'
import CreateTasks from '../../components/project/CreateTask'
import ListTasks from '../../components/project/ListTasks'


const ListPage = () => {

  const {tasks, setTasks} = useState([]);

  return (
    <div>
        <DefaultLayout>
          <ProjectLayout/>
              <SearchBar/>
              <div className="createTasks">
                <CreateTasks tasks={tasks} setTasks={setTasks}/>
                <ListTasks tasks={tasks} setTasks={setTasks}/>
              </div>
        </DefaultLayout>
    </div>
  )
}

export default ListPage