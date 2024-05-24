import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import ChatPage from "../pages/chat/ChatPage";
import ListPage from "../pages/board/ListPage";
import ModifyPage from "../pages/board/ModifyPage";
import ViewPage from "../pages/board/ViewPage";
import WritePage from "../pages/board/WritePage";
import CalendarPage from "../pages/calendar/CalendarPage";
import ProjectList from "../pages/project/ProjectList";
import LoginPage from "../pages/user/LoginPage";
import ChatExPage from "../pages/chat/ChatExPage";
import RegisterPage from "../pages/user/RegisterPage";
import ChatRegisterPage from "../pages/chat/ChatRegisterPage";

//router 생성
const root = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/chat", element: <ChatPage /> }, //채팅
  { path: "/board/list", element: <ListPage /> }, //게시판 리스트
  { path: "/board/modify", element: <ModifyPage /> }, //게시판 수정
  { path: "/board/view", element: <ViewPage /> }, //게시판 뷰
  { path: "/board/write", element: <WritePage /> }, //게시판 작성
  { path: "/calendar", element: <CalendarPage /> }, //캘린더
  { path: "/project", element: <ProjectList /> }, //프로젝트 마일스톤
  { path: "/user/login", element: <LoginPage /> }, //로그인 페이지
  { path: "/user/register", element: <RegisterPage /> }, //회원가입
  { path: "/chatEx", element: <ChatExPage /> }, //
  { path: "/chatRegister", element: <ChatRegisterPage /> }, //
]);

// router 내보내기
export default root;
