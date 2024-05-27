import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Test from "./Test";

// 초기 아이템을 빈 배열로 설정합니다.
const initialItems1 = [];
const initialItems2 = [];
const initialItems3 = [];

const DragAndDrop = () => {
  // 상태로 각 섹션의 아이템을 관리합니다.
  const [items1, setItems1] = useState(initialItems1);
  const [items2, setItems2] = useState(initialItems2);
  const [items3, setItems3] = useState(initialItems3);
  const [AddItemStatus, setAddItemStatus] = useState(false);
  const [AddItemStatus1, setAddItemStatus1] = useState(false);
  const [AddItemStatus2, setAddItemStatus2] = useState(false);
  const [AddItemStatus3, setAddItemStatus3] = useState(false);

  // 새 아이템의 고유 ID를 생성하는 함수입니다.
  const ItemId = () => `item-${new Date().getTime()}`; //Date - 타임스탬프를 얻음
  const [title, setTitle] = useState(""); //입력한 제목 상태 저장
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [member, setMember] = useState("");


// 아이템 생성
  const addItem = (setItems) => {
    if (!title.trim()) return;
    const newItem = { id: ItemId(), title, content, status, member };
    setItems((prevItems) => [...prevItems, newItem]);
    setTitle("");
    setContent("");
    setStatus("");
    setMember("");
    setAddItemStatus(false);
  };

  const addItem2 = (setItems) => {
    if (!title.trim()) return;
    const newItem = { id: ItemId(), title, content, status, member };
    setItems((prevItems) => [...prevItems, newItem]);
    setTitle("");
    setContent("");
    setStatus("");
    setMember("");
    setAddItemStatus(false);
  };

  const addItem3 = (setItems) => {
    if (!title.trim()) return;
    const newItem = { id: ItemId(), title, content, status, member };
    setItems((prevItems) => [...prevItems, newItem]);
    setTitle("");
    setContent("");
    setStatus("");
    setMember("");
    setAddItemStatus(false);
  };


  // 드래그 종료 시 호출되는 함수입니다.
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 드래그가 Droppable 영역 외부에서 끝난 경우
    if (!destination) return;

    // 동일한 Droppable 내에서의 이동을 처리하는 함수입니다.
    const updateItems = (items, setItems) => {
      const newItems = Array.from(items);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);
      setItems(newItems);
    };

    // 동일한 Droppable 내에서 이동 시
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "droppable1") {
        updateItems(items1, setItems1);
      } else if (source.droppableId === "droppable2") {
        updateItems(items2, setItems2);
      } else if (source.droppableId === "droppable3") {
        updateItems(items3, setItems3);
      }
    }
    // 다른 Droppable로의 이동 시
    else {
      const moveItemBetweenLists = (sourceItems, setSourceItems, destItems, setDestItems) => {
        const sourceCopy = Array.from(sourceItems);
        const destCopy = Array.from(destItems);
        const [movedItem] = sourceCopy.splice(source.index, 1);
        destCopy.splice(destination.index, 0, movedItem);
        setSourceItems(sourceCopy);
        setDestItems(destCopy);
      };

      if (source.droppableId === "droppable1" && destination.droppableId === "droppable2") {
        moveItemBetweenLists(items1, setItems1, items2, setItems2);
      } else if (source.droppableId === "droppable2" && destination.droppableId === "droppable1") {
        moveItemBetweenLists(items2, setItems2, items1, setItems1);
      } else if (source.droppableId === "droppable1" && destination.droppableId === "droppable3") {
        moveItemBetweenLists(items1, setItems1, items3, setItems3);
      } else if (source.droppableId === "droppable3" && destination.droppableId === "droppable1") {
        moveItemBetweenLists(items3, setItems3, items1, setItems1);
      } else if (source.droppableId === "droppable2" && destination.droppableId === "droppable3") {
        moveItemBetweenLists(items2, setItems2, items3, setItems3);
      } else if (source.droppableId === "droppable3" && destination.droppableId === "droppable2") {
        moveItemBetweenLists(items3, setItems3, items2, setItems2);
      }
    }
  };

  ////// 테스트 ///////

  const [projectInfo, setProjectInfo] = useState({
    "projectName" : "프로젝트1",
    "projectContent" : "첫번쨰 프로젝트 입니다."
  })

  const [rightSideBar, setRightSideBar] = useState(false);

  const rightSideHandler = () => {
    return setRightSideBar(true);
  }
  const rightSideHandlerClose = (event) => {
    const testBox = document.getElementsByClassName("testBox")[0];
    if (event.target === testBox){
        return setRightSideBar(false);

    }
  }

  return (
    <div className="ProjectList">
      <div className="DragAndDrop">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="droppable-container">

{/*////////////////////////--Ready 아이템 생성--/////////////////////////////////////////////////////////*/ }

         <Droppable droppableId="droppable1">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="droppable">
                  <h3>Ready</h3>
                  {!AddItemStatus1 && <button onClick={() => setAddItemStatus1(true)}>Add Item</button>}
                  {AddItemStatus1 && (
                    <div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                      />
                      <button onClick={() => addItem(setItems1, title, setTitle)}>Add</button>
                    </div>
                  )}
                  {items1.map((item1, index) => (
                    <Draggable key={item1.id} draggableId={item1.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`draggable ${snapshot.isDragging ? "is-dragging" : ""}`}
                        >
                          <h4>{item1.title}</h4>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>



{/*////////////////////////--InProgress 아이템 생성--/////////////////////////////////////////////////////////*/ }


            <Droppable droppableId="droppable2">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="droppable">
                  <h3>InProgress</h3>
                  {!AddItemStatus2 && <button onClick={() => setAddItemStatus2(true)}>Add Item</button>}
                  {AddItemStatus2 && (
                    <div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                      />
                      <button onClick={() => addItem2(setItems2, title, setTitle)}>Add</button>
                    </div>
                  )}
                  {items2.map((item2, index) => (
                    <Draggable key={item2.id} draggableId={item2.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`draggable ${snapshot.isDragging ? "is-dragging" : ""}`}
                        >
                          <h4>{item2.title}</h4>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

{/*////////////////////////--Complete 아이템 생성--/////////////////////////////////////////////////////////*/ }


            <Droppable droppableId="droppable3">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="droppable">
                  <h3>Complete</h3>
                  {!AddItemStatus3 && <button onClick={() => setAddItemStatus3(true)}>Add Item</button>}
                  {AddItemStatus3 && (
                    <div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                      />
                      <button onClick={() => addItem3(setItems3, title, setTitle)}>Add</button>
                    </div>
                  )}
                  {items3.map((item3, index) => (
                    <Draggable key={item3.id} draggableId={item3.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`draggable ${snapshot.isDragging ? "is-dragging" : ""}`}
                        >
                          <h4>{item3.title}</h4>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

{/*/////////////////////////////////////////////////////////////////////////////////////////*/ }


          </div>
        </DragDropContext>

      </div>
      <button onClick={rightSideHandler}>하이</button>

      {rightSideBar && <Test rightSideHandlerClose={rightSideHandlerClose} projectInfo={projectInfo}></Test>}
      
      

    </div>
  );
};

export default DragAndDrop;
