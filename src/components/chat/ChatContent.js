import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { FAILSAFE_SCHEMA } from 'js-yaml';

const ChatContent = () => {

  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  const [inviteEmail , setInviteEmail] = useState('');

  const inviteInputHandler = (e)=>{
    e.preventDefault();
    setInviteEmail(e.target.value);
  }

  //찐초대 핸들러
  const inviteSendHandler = (e)=>{
    e.preventDefault();
    fetch('http://15.165.171.40:8080/community/chatSearchUser?userEmail='+inviteEmail+'&room='+r)
    .then(response => response.json())
    .then(data => {if(data.result==0){
        alert('해당 사용자가 없습니다.')
    }else{
      alert('초대 되었습니다.')
      setModalIsOpen(false);
    }})
    .catch(error => console.error('Error fetching user rooms:', error));
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const r = searchParams.get('room'); 

  const [room , setRoom] = useState({});

  const [beforeChat, setBeforeChat] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const inviteHandler = (e) => {
    e.preventDefault();
    setModalIsOpen(true); // Open modal on invite button click
  }

  useEffect(() => {
    if (r != null) {
      fetch('http://15.165.171.40:8080/community/myRoom?room='+r)
        .then(response => response.json())
        .then(data => setRoom(data.result))
        .catch(error => console.error('Error fetching user rooms:', error));

        fetch('http://15.165.171.40:8080/community/beforeChat?room='+r)
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

    console.log('useEffect - isConnected');

    if (isConnected) {
      ws.current = new WebSocket('wss://15.165.171.40:8080/community/chattings');
      console.log("소켓몇번?")
      
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

//멤버보기 기능


const [memberModalIsOpen, setMemberModalIsOpen] = useState(false);
const [members, setMembers] = useState([]);

const openMemberHandler = (e)=>{
  e.preventDefault();

  fetch('http://15.165.171.40:8080/community/chatMembers?room='+r)
  .then(response => response.json())
  .then(data => {
    console.log(data.result)
    setMembers(data.result);
    setMemberModalIsOpen(true);
})
  .catch(error => console.error('Error fetching user rooms:', error));

}

  const customStyles = {
    content: {
      top: '40%',
      left: '53%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
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
              <span className='chatMember' onClick={openMemberHandler}> 멤버 보기</span> 
              <span className='chatMember' onClick={inviteHandler}> 멤버 초대</span>
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

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Invite Modal"
      >
        <h2>멤버 초대   <button  style={{marginLeft: '170px', border: 'none', fontSize: '20px'}} onClick={() => setModalIsOpen(false) }>X</button></h2>
        <br/>
        <form onSubmit={inviteSendHandler}>
          <label>
            <input type="text" onChange={inviteInputHandler} style={{width: '100%', height: '50px'}} placeholder='사용자 이메일 입력'/>
          </label>
          <br/>
          <br/>
          <br/>
          <button type="submit" className='chatButtonp'  style={{marginLeft: '130px'} }>초대</button>
        </form>
      </Modal>


      <Modal
        isOpen={memberModalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Invite Modal"
      >
        <h2>현재 멤버   <button  style={{marginLeft: '170px', border: 'none', fontSize: '20px'}} onClick={() => setMemberModalIsOpen(false) }>X</button></h2>
        <br/>
        {members.map((user, index) => (
            <p key={index}>{user.name}</p>
          ))}
   
      </Modal>

    </>
  );
};

export default ChatContent;