import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <>
      <aside>
        <h1>
          <Link to="/">
            <img src="/images/logo2.png" />
          </Link>
        </h1>
        <div class="sideBar">
          <div>
            <Link to="/">DashBoard</Link>
          </div>
          <div>
            <Link to="/board/list">자유 게시판</Link>
          </div>
          <div>
            <Link to="/page/list">Page</Link>
          </div>
          <div>
            <a href="/project">Project</a>
          </div>
          <div>
            <a href="/chat">Chat</a>
          </div>
          <div>
            <a href="#">Calendar</a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
