import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FAILSAFE_SCHEMA } from 'js-yaml';
import url from '../../config/url';
import { format } from 'date-fns';


const ChatContent = ( props ) => {

  console.log(`${url.backendUrl}+???`)
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);


  const [inviteEmail , setInviteEmail] = useState('');

  const inviteInputHandler = (e)=>{
    e.preventDefault();
    setInviteEmail(e.target.value);
  }

  //찐초대 핸들러
  const inviteSendHandler = (e)=>{
    e.preventDefault();
    fetch(`${url.backendUrl}/chatSearchUser?userEmail=`+document.getElementById('insertEmail').value+'&room='+r)
    .then(response => response.json())
    .then(data => {if(data.result==0){
        alert('해당 사용자가 없습니다.')
    }else if(data.result == -1){
      alert('이미 초대된 사용자입니다.')
    }else{
      alert('초대 되었습니다.')
    }setModalIsOpen(false);})
    .catch(error => console.error('Error fetching user rooms:', error));
  }
  
  const [invites, setInvites] = useState([]);
  const inserEmailHandler = (e)=>{
    console.log(e.target.value+"!")
    fetch(`${url.backendUrl}/searchDm?word=`+e.target.value)
    .then(response => response.json())
    .then(data => {
      console.log(data.result);
      setInvites(data.result);
  })
    .catch(error => console.error('Error fetching user rooms:', error));
  }

  const selectMemberHandler = (e)=>{
    document.getElementById('insertEmail').value = e.target.textContent;
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  var r = searchParams.get('room'); 

  const [room , setRoom] = useState({});

  const [beforeChat, setBeforeChat] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const inviteHandler = (e) => {
    e.preventDefault();
    setModalIsOpen(true); // Open modal on invite button click
  }

  useEffect(() => {
    if (r != null) {
      fetch(`${url.backendUrl}/myRoom?room=`+r+'&userId='+authSlice.username)
        .then(response => response.json())
        .then(data => {setRoom(data.result)
          console.log(data.result + "룸 설정!");
        })
        .catch(error => console.error('Error fetching user rooms:', error));

        fetch(`${url.backendUrl}/beforeChat?room=`+r+'&userId='+authSlice.username)
        .then(response => response.json())
        .then(data => {setBeforeChat(data.result);
        fetch(`${url.backendUrl}/beforeChatRead?room=`+r+'&userId='+authSlice.username);}
      )
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



  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const [isConnected, setIsConnected] = useState(false);


  
  useEffect(() => {
    setUserName(authSlice.username);
    setIsConnected(true);
  }, [authSlice.username]);

  const ws =  props.ws;
  const chatAll = props.chat;


  useEffect(() => {
    if ( ws.onopen ) { 
      console.log('이건 왜 되고!')
      if (chatAll.length > 0) {
        const [nickname, time, roomNumber, text] = chatAll[chatAll.length - 1].split('*');
        if(roomNumber.trim() === r){
          setChat(prevChat => [...prevChat, chatAll[chatAll.length - 1]]);
        }
      }
    }
  }, [ ws , chatAll ]);

  const handleSend = () => {
    if (ws.onopen) {
      const time = getCurrentTime();
      ws.send(`${userName}*${time}*${room.chatRoomPk}*${message}`);
      setMessage('');
    }
  };

//멤버보기 기능


const [memberModalIsOpen, setMemberModalIsOpen] = useState(false);
const [members, setMembers] = useState([]);

const openMemberHandler = (e)=>{
  e.preventDefault();

  fetch(`${url.backendUrl}/chatMembers?room=`+r)
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
  const navigate = useNavigate();

  //채팅방 나가기 기능
  const deleteChatHandler = (e)=>{
    e.preventDefault();
    if(window.confirm('정말로 나가겠습니까?')){
      fetch(`${url.backendUrl}/outChatRoom?userId=`+authSlice.username+'&room='+r)
      .then(response => response.json())
      .then(data => {if(data.result==0){
          alert('채팅방에 나갔습니다.');
          
          window.location.href = `/chat`;
          location.reload();
      }})
      .catch(error => console.error('Error fetching user rooms:', error));
    }
  }

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
            <div className='chatTitle'>
              <h2 className="title"> {room.roomName} 
              <span className='chatBlank'></span>
              {room.status === 0 ? ( <span className='chatMember' onClick={inviteHandler}> 멤버 초대</span> ) : (<> </>)}
              {room.status === 0 ? ( <span className='chatMember' onClick={deleteChatHandler}> 채팅방 나가기</span> ) : (<> </>)}
              {room.status === 0 ? ( <span className='chatMember' onClick={openMemberHandler}> 멤버 보기</span> ) : (<> </>)}
              </h2>
              </div>
              <div id="chatting">
                <div className="chat">
                    {beforeChat.map((chats, index) => (
                      <div key={index}>
                      <p style={{marginLeft: '47%', fontSize: '20px'}}>{format(chats[0].localDateTime, 'yyyy-MM-dd')}</p>   
                      { chats.map((exChat, index)=>{
                        const nickname = exChat.userId;
                        const time =   format(exChat.localDateTime, 'yyyy-MM-dd HH:mm') ;
                        const [date, timePart] = time.trim().split(' ');
                        const text = exChat.message;
                        return (
                          <div key={index}   className={exChat.status == 0 ? ('chat-unreadItem') : ('chat-item')}  >           
                            <div>
                              <img className="chat-image" src="/images/logo.png" alt="로고" style={{ marginRight: "10px" }} />
                            </div>
                            <div className="chat-text">
                              <span>{nickname.trim() + ' '}</span>
                            <span>   {date === getCurrentDate() ? (
                                <>{timePart.trim()}</>
                              ) : (
                                <> <span>{date.trim()}</span></>
                              )}</span>
                              <p className="chat-textarea">
                                {text.trim()}
                              </p>
                            </div>
                          </div>
                        );
                      })
  
                      }
                      </div>
                    ))}
                  
                  
                  
              


                  {chat.map((msg, index) => {
                    const [nickname, time, roomNumber, text] = msg.split('*');
                    const [date, timePart] = time.trim().split(' ');
                    if (roomNumber.trim() !== r) {
                      return null;
                    }
                    return  (
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
            <input  id="insertEmail" type="text" onChange={inserEmailHandler} style={{width: '100%', height: '50px'}} placeholder='사용자 이메일 입력'/>
            <div className='inviteDiv' style={{border: '1px solid gray', width: '100%', maxHeight: '100px', overflow: 'scroll', marginTop: '2px'}}>
              {invites.map(member =>(
                <p  key={member.uid} onClick={selectMemberHandler} >{member.email}</p>
              )
              )}
            </div>
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