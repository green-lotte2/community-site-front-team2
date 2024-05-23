import React, { useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import ProjectLayout from '../../components/project/ProjectLayout'
import SearchBar from '../../components/project/SearchBar'
import DragAndDrop from '../../components/project/DragAndDrop';
import "../../styles/projectList.scss";


const ListPage = () => {
  return (
    <div>
        <DefaultLayout>
          <ProjectLayout/>
              <SearchBar/>
                <DragAndDrop/>
        </DefaultLayout>
    </div>
  )
}

export default ListPage