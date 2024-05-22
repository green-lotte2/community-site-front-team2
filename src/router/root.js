import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import ChatPage from "../pages/chat/ChatPage";
import ListPage from "../pages/board/ListPage";
import ModifyPage from "../pages/board/ModifyPage";
import ViewPage from "../pages/board/ViewPage";
import WritePage from "../pages/board/WritePage";
import CalendarPage from '../pages/calendar/CalendarPage';
import ProjectList from '../pages/project/ProjectList';
import LoginPage from "../pages/user/LoginPage";
import ChatExPage from '../pages/chat/ChatExPage';

//router 생성
const root = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/board/list", element: <ListPage /> },
  { path: "/board/modify", element: <ModifyPage /> },
  { path: "/board/view", element: <ViewPage /> },
  { path: "/board/write", element: <WritePage /> },
  { path: "/calendar", element: <CalendarPage/> },
  { path: "/project", element: <ProjectList/> },
  { path: "/user/login", element: <LoginPage /> },
  { path: "/chatEx", element: <ChatExPage/> },
]);
 
// router 내보내기
export default root;
