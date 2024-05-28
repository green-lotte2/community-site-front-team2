import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import authSlice from "../../slices/authSlice";
import { useSelector } from "react-redux";
import url from "../../config/url";
import createWebSocket from "../../config/createWebSocket";

const Header = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);

  //알림
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  var r = searchParams.get('room'); 
  if(r == null){
    r=-1;
  }
 
  var ws = props.ws;
  var [chatAll, setChatAll] = useState([]);
  if(ws != null){
    chatAll = props.chat;
  }  

  useEffect(() => {
    if (ws == null) {
      console.log('되나..?')
      ws = createWebSocket();
    }
    ws.onmessage = (event) => {
      const message = event.data;
      console.log(message + "이거되나요/!");
      setChatAll(prevChat => [...prevChat, message]);
    };
  }, [ws]);
  

useEffect(() => {
  if (chatAll.length > 0) {
    const [nickname, time, roomNumber, text] = chatAll[chatAll.length - 1].split('*');
    if(roomNumber.trim() != r){
      fetch(`${url.backendUrl}/chatAlarm?userName=`+authSlice.username)
      .then(response => response.json())
      .then(data =>   {
        console.log(data.result);
        document.getElementById('chatchat').textContent = data.result;
      })
      .catch(error => console.error('Error fetching user rooms:', error));
    }

  }
}, [ws]);

  useEffect(() => {
    fetch(`${url.backendUrl}/chatAlarm?userName=` + authSlice.username)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        document.getElementById("chatchat").textContent = data.result;
      })
      .catch((error) => console.error("Error fetching user rooms:", error));
  }, []);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/main");
  };

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
              <p className="alert" id="chatchat"></p>
            </Link>

            {!authSlice.username ? (
              <>
                <Link to="/user/login">
                  <img src="/images/user_50.png" alt="user" />
                  <p>로그인</p>
                </Link>
              </>
            ) : (
              <>
                <Link to="/user/logout" onClick={logoutHandler}>
                  <img src="/images/user_50.png" alt="user" />
                  <p>로그아웃</p>
                </Link>
              </>
            )}
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
