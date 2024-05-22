import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import ChatPage from "../pages/chat/ChatPage";
import LoginPage from "../pages/user/LoginPage";

//router 생성
const root = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/user/login", element: <LoginPage /> },
]);

// router 내보내기
export default root;
