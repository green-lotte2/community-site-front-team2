import {createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/main/MainPage';

//router 생성
const root = createBrowserRouter([
  { path: "/", element: <MainPage/> },

]);

// router 내보내기
export default root;