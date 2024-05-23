import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ChatContent = () => {

  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const r = searchParams.get('room'); 

  const [room , setRoom] = useState({});

  const [beforeChat, setBeforeChat] = useState([]);

  useEffect(() => {
    if (r != null) {
      fetch('http://localhost:8080/community/myRoom?room='+r)
        .then(response => response.json())
        .then(data => setRoom(data.result))
        .catch(error => console.error('Error fetching user rooms:', error));

        fetch('http://localhost:8080/community/beforeChat?room='+r)
        .then(response => response.json())
        .then(data => setBeforeChat(data.result))
        .catch(error => console.error('Error fetching user rooms:', error));
    }
  }, [r]);

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isConnected) {
      ws.current = new WebSocket('ws://localhost:8080/community/chattings');
      
      ws.current.onopen = () => {
        console.log('WebSocket connection established');
      };
      
      ws.current.onmessage = (event) => {
        setChat(prevChat => [...prevChat, event.data]);
      };
      
      return () => {
        ws.current.close();
      };
    }
  }, [isConnected]);

  const handleSend = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const time = getCurrentTime();
      console.log(time);
      ws.current.send(`${userName}*${time}*${room.chatRoomPk}*${message}`);
      setMessage('');
    }
  };

  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);

  useEffect(() => {
    setUserName(authSlice.username);
    setIsConnected(true);
  }, [authSlice.username]);

  return (
    <>
      {r === null ? (
        <div id="content">
          <div className='chatSelect'>
            <h1>채팅방을 선택해주세요</h1>
          </div>
        </div>
      ) : (
        <div id="content">
          {room.roomName ? (
            <>
              <h2 className="title"> {room.roomName} 
              <span className='chatBlank'></span>
              <span className='chatMember'> 멤버 보기</span> 
              <span className='chatMember'> 멤버 초대</span>
              <span className='chatMember'> 채팅방 나가기</span>
              </h2>

              <div id="chatting">
                <div className="chat">
                {beforeChat.map((exChat, index) => {
                    const nickname = exChat.userId;
                    const time = exChat.localDateTime;
                    const text = exChat.message;
                    return (
                      <div key={index} className="chat-item">
                        <div>
                          <img className="chat-image" src="/images/logo.png" alt="로고" style={{ marginRight: "10px" }} />
                        </div>
                        <div className="chat-text">
                          <span>{nickname.trim() + ' '}</span>
                        <span>{time}</span>
                          <p className="chat-textarea">
                            {text.trim()}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {chat.map((msg, index) => {
                    const [nickname, time, roomNumber, text] = msg.split('*');
                    const [date, timePart] = time.trim().split(' ');
                    return (
                      <div key={index} className="chat-item">
                        <div>
                          <img className="chat-image" src="/images/logo.png" alt="로고" style={{ marginRight: "10px" }} />
                        </div>
                        <div className="chat-text">
                          <span>{nickname.trim() + ' '}</span>
                          {date === getCurrentDate() ? (
                            <>{timePart.trim()}</>
                          ) : (
                            <> <span>{date.trim()}</span></>
                          )}
                          <p className="chat-textarea">
                            {text.trim()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="chatInsert" style={{ border: "1px solid black", padding: "10px", display: "flex", alignItems: "center" }}>
                <button className="chat-btn-attachment">+</button>
                <input type="text" className="chat-input" value={message} placeholder="메시지 입력..." onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }} />
                <button onClick={handleSend} className="chat-btn-send">▶</button>
              </div>
              <br />
              <br />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
};

export default ChatContent;