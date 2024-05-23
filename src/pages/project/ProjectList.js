import React, { useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import ProjectList from '../../components/project/ProjectList'
import ProjectLayout from '../../components/project/ProjectLayout'
import SearchBar from '../../components/project/SearchBar'


const ListPage = () => {

  const {tasks, setTasks} = useState([]);

  return (
    <div>
        <DefaultLayout>
          <ProjectLayout/>
              <SearchBar/>

        </DefaultLayout>
    </div>
  )
}

export default ListPage