import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const authSlice = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  if (authSlice.username != null) {
    navigate(`/main`);
  }
  return (
    <div className="Home">
      <div className="first_div">
        <div className="txt_title">
          <img src="../images/logo.png"></img>
          <h2>일름보에 오신걸 환영합니다.</h2>
        </div>

        <div className="txt_link">
          <Link to="/user/login">로그인</Link>
          <Link to="/user/register">일름보 멤버되기</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
