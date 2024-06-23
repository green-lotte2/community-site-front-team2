import { useEffect, useState } from "react";
import "./bootstrap.css";
import './App.css';
import Navbar from "../../components/project/kanban/Navbar/Navbar";
import Board from "../../components/project/kanban/Board/Board";
import Editable from "../../components/project/kanban/Editable/Editable";

// import data from '../data'
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "use-local-storage";

import DefaultLayout from "../../layouts/DefaultLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../config/url";

function ProjectBoard() {
  const [data, setData] = useState(
    localStorage.getItem("kanban-board")
      ? JSON.parse(localStorage.getItem("kanban-board"))
      : []
  );

  const defaultDark = window.matchMedia(
    "(prefers-colors-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
  
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);
  
    return tempData; // 변경된 데이터 반환
  };
  

  const dragCardInSameBoard = (source, destination) => {
    let tempData = Array.from(data);
    const index = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
  
    let [removedCard] = tempData[index].card.splice(source.index, 1);
    tempData[index].card.splice(destination.index, 0, removedCard);
  
    return tempData; // 변경된 데이터 반환
  };
  

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
    });
    setData(tempData);
  };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
  
    if (source.droppableId === destination.droppableId) {
      const newData = dragCardInSameBoard(source, destination);
      setData(newData);
    } else {
      const newData = dragCardInBoard(source, destination);
      setData(newData);
    }
  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    console.log(tempBoards);
    setData(tempBoards);
  };


  useEffect(() => {
    if(projectNo){
      console.log("ss");
      localStorage.setItem("kanban-board", JSON.stringify(data));
    }
  }, [data]);

  const authSlice = useSelector((state) => state.authSlice);
  const urlParams = new URLSearchParams(window.location.search);
  const projectNo = urlParams.get('projectNo');


  //상태 저장
  const saveHandler = () =>{
    localStorage.setItem("kanban-board", JSON.stringify(data));
    
    console.log("필살 화약성!");
    console.log(localStorage.setItem);

    const projectInfo = {
      boardNo: projectNo,
      projectNo: projectNo,
      userId: authSlice.username,
      saveItem: localStorage.getItem("kanban-board"),
    }
    console.log("누가 내머리에 똥을 쌋나?", projectInfo);

    axios.post(`${url.backendUrl}/project/boardsave`, projectInfo)
      .then(res => {
        console.log("프로젝트 등록");
      
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  
  const [isLoading, setIsLoading] = useState(true);

  const loadPage = async () => {
    setIsLoading(true); // 로딩 상태 시작
    try {
      const response = await axios.get(
        `${url.backendUrl}/project/projectboard?projectNo=${projectNo}`,
        {
          headers: { Authorization: `Bearer ${authSlice.accessToken}` },
        }
      );
      console.log("도깨비참수");
      console.log(response.data);

      if (response.data !== "") {
        localStorage.setItem("kanban-board", JSON.stringify(response.data));
        setData(response.data);
      } else {
        localStorage.removeItem("kanban-board");
        setData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  useEffect(() => {
    if (projectNo) {
        loadPage();
    }
  }, [projectNo]);


  // 화면 이동을 할 때 데이터 저장
    useEffect(() => {
        // 사용자가 페이지를 떠나려고 할 때 실행
        const handleBeforeUnload = (event) => {
            console.log("유슈얼서스펙트")
            saveHandler();
            event.preventDefault();
        };
        // 사용자가 페이지를 떠날 때 handleBeforeUnload 함수 실행(데이터 저장)
        console.log("유슈얼서스펙트2")
        window.addEventListener('beforeunload', handleBeforeUnload);
        localStorage.removeItem("kanban-board");
        // 컴포넌트가 언마운트 될 때 beforeunload 이벤트 리스너 제거 및 데이터 저장
        return () => {
            console.log("유슈얼서스펙트3")
            window.removeEventListener('beforeunload', handleBeforeUnload);
            saveHandler();
            localStorage.removeItem("kanban-board");
        };
    },[data]);
  


  return (
    <DefaultLayout>
      <div className="projectList">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="KanBanBoard" data-theme={theme}>
            <Navbar switchTheme={switchTheme} />
            <div className="app_outer">
              <div className="app_boards">
                {data.map((item) => (
                  <Board
                    key={item.id}
                    id={item.id}
                    name={item.boardName}
                    card={item.card}
                    setName={setName}
                    addCard={addCard}
                    removeCard={removeCard}
                    removeBoard={removeBoard}
                    updateCard={updateCard}
                  />
                ))}
                <Editable
                  class={"add__board"}
                  name={"Add Board"}
                  btnName={"Add Board"}
                  onSubmit={addBoard}
                  placeholder={"Enter Board  Title"}
                />
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </DefaultLayout>
  );
}

export default ProjectBoard;
