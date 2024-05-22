import React from 'react'
import "./ProjectList.css"

const ProjectList = () => {
  return (
    <div>
      <div class="container" className="container">
        <div id="content">
            <div id="Project">


                <div class="mileStone" className="mileStone">

                    <div class="mileStoneLayout" className="mileStoneLayout">

                        <div class="Ready" className="Ready">
                            {/*<FontAwesomeIcon icon="fa-solid fa-circle"/>*/}
                            <h4>Ready</h4>
                            <div class="ReadyContent" className="ReadyContent">
                            </div>
                        </div>

                        <div class="InPrograss" className="InPrograss">
                            {/*<FontAwesomeIcon icon="fa-solid fa-circle" />*/}
                            <h4>In Progress</h4>
                                <div class="InPrograssContent" className="InPrograssContent">
                                    di
                                </div>
                        </div>

                        <div class="Completed" className="Completed">
                            {/*<FontAwesomeIcon icon="fa-solid fa-circle" />*/}

                            <h4>Completed</h4>
                                <div class="CompletedContent" className="CompletedContent">
                                    
                                </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectList