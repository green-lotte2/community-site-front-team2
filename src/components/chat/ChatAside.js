import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import url from '../../config/url';
import Modal from 'react-modal';

const ChatAside = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {

      fetch(`${url.backendUrl}/chattingRoom?userName=`+authSlice.username)
          .then(response => response.json())
          .then(data =>   {
            console.log(data.result);
            setUserRooms(data.result);
          })
          .catch(error => console.error('Error fetching user rooms:', error));
  }, []); 

 //모달
 const [modalIsOpen, setModalIsOpen] = useState(false);
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
const openMemberHandler = (e)=>{
  e.preventDefault();

  fetch(`${url.backendUrl}/chatMembers?room=`)
  .then(response => response.json())
  .then(data => {
    console.log(data.result)

})
  .catch(error => console.error('Error fetching user rooms:', error));

}
  return (
    <>
      <aside>
        <h1>
          <Link to="/">
            <img src="/images/logo.png" />
          </Link>
        </h1>

        <div className='chatMenu'>
          <br/>
          <br/>
          <div>
            <Link className='chatLarge' to="/main">
              <img src="/images/dashboard_50.png"></img>DashBoard
            </Link>
          </div>
          <br/>
          <br/>
          <div>

           <Link to="/chatRegister"  className='chatLarge'>
            <img src='/images/channel_50.png'></img>채널 <span>  + </span></Link><br/>
            {userRooms.map(room => (
           <Link  to={`/chat?room=${room.chatRoomPk}`} key={room.chatRoomPk}>
          {room.roomName}<br/>
            </Link>
          ))}

          </div>
          <br/>
          <br/>
          <div>
            <Link  className='chatLarge'><img src='/images/dm_50.png'></img>DM <span>+</span></Link>
          </div>
    
        </div>
      </aside>

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

    </>
  );
};

export default ChatAside;