import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Aside = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const chatHandler = (e)=>{
    alert('클릭!')
    if(!authSlice.username){
      e.preventDefault();
      if(window.confirm('로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?')){
        window.location.href='/user/login';
      }
    }
  }
  return (
    <>
      <aside>
        <h1>
          <Link to="/">
            <img src="/images/logo3.png" />
          </Link>
        </h1>
        <div class="sideBar">
          <div>
            <Link to="/main">
              <img src="/images/dashboard_50.png"></img>DashBoard
            </Link>
          </div>
          <div>
            <Link to="/board/list">
              <img src="/images/board_50.png"></img>Community
            </Link>
          </div>
          <div>
            <Link to="/page/list">
              <img src="/images/page_50.png"></img>Page
            </Link>
          </div>
          <div>
            <Link to="/project">
              <img src="/images/project_50.png"></img>Project
            </Link>
          </div>
          <div>
            <Link to="/chat" onClick={ chatHandler}>
              <img src="/images/chat_white.png"></img>Chat
            </Link>
          </div>
          <div>
            <Link to="/calendar">
              <img src="/images/calendar_50.png"></img>Calendar
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
