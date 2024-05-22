import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import ChatPage from "../pages/chat/ChatPage";
import ListPage from "../pages/board/ListPage";
import ModifyPage from "../pages/board/ModifyPage";
import ViewPage from "../pages/board/ViewPage";
import WritePage from "../pages/board/WritePage";

//router 생성
const root = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/board/list", element: <ListPage /> },
  { path: "/board/modify", element: <ModifyPage /> },
  { path: "/board/view", element: <ViewPage /> },
  { path: "/board/write", element: <WritePage /> },
]);

// router 내보내기
export default root;
