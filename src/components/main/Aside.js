import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
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
            <Link to="/chat">
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
