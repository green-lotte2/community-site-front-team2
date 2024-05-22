import React, { useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import ProjectList from '../../components/project/ProjectList'
import ProjectLayout from '../../components/project/ProjectLayout'
import SearchBar from '../../components/project/SearchBar'
import KanbanBoard from '../../components/project/KanbanBoard'

const ListPage = () => {

  const {tasks, setTasks} = useState([]);

  return (
    <div>
        <DefaultLayout>
          <ProjectLayout/>
              <SearchBar/>
                <KanbanBoard>
                
                </KanbanBoard>
        </DefaultLayout>
    </div>
  )
}

export default ListPage