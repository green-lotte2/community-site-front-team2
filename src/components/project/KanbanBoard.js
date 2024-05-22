import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

export default function KanbanBoard() {
    
    const [completed, setCompleted] = useState([]);
    const [incompleted, setInCompleted] = useState([]);

    const onDragEnd = (result) => {
   };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h2 style={{ textAlign : "center" }}>PROGRESS BOARD</h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >

            </div>
        </DragDropContext>
    );
}
