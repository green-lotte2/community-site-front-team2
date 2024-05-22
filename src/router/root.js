import {createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/main/MainPage';
import ChatPage from '../pages/chat/ChatPage';
import ChatExPage from '../pages/chat/ChatExPage';

//router 생성
const root = createBrowserRouter([
  { path: "/", element: <MainPage/> },
  { path: "/chat", element: <ChatPage/> },
  { path: "/chatEx", element: <ChatExPage/> },

]);

// router 내보내기
export default root;