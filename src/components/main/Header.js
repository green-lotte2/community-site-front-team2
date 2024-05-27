import React, { useState } from "react";
import { Link } from "react-router-dom";
import authSlice from "../../slices/authSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const authSlice = useSelector((state) => state.authSlice);
  return (
    <>
      <header>
        <div>
          <div className="navRight">
          <Link to="/chat">
              <img src="/images/chat_50.png" alt="bell" />
              <p>채팅</p>
            </Link>
            <Link to="/">
              <img src="/images/alarm_40.png" alt="bell" />
              <p className="alert">10</p>
            </Link>
        
            {!authSlice.username ? ( <>  <Link to="/user/login"><img src="/images/user_50.png" alt="user" /><p>로그인</p></Link></>) : 
          (<><Link to="/user/logout"><img src="/images/user_50.png" alt="user" /><p>로그아웃</p></Link></> )}
            <Link to="/user/register">
              <img src="/images/join_50.png" alt="user" />
              <p>회원가입</p>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
