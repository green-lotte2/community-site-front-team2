import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import url from '../../config/url';
import Modal from 'react-modal';

const ChatAside = () => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const [userRooms, setUserRooms] = useState([]);
  const navigate = useNavigate();

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
  setModalIsOpen(true);
}

//사용자 dm handler
const [members, setMembers] = useState([]);

const inserDmHandler = (e)=>{
  console.log(e.target.value+"!")
  fetch(`${url.backendUrl}/searchDm?word=`+e.target.value)
  .then(response => response.json())
  .then(data => {
    console.log(data.result);
    setMembers(data.result);
})
  .catch(error => console.error('Error fetching user rooms:', error));
}
//dm 상태 선택 핸들러
const selectDmHandler = (e)=>{
  console.log(e.target.textContent)
  document.getElementById('insertDM').value = e.target.textContent;
}
const location = useLocation();
//dm 만들기 핸들러
const makeDmHandler = (e)=>{
  e.preventDefault();
  fetch(`${url.backendUrl}/makeDm?email=`+document.getElementById('insertDM').value+'&user='+authSlice.username)
          .then(response => response.json())
          .then(data =>   {
            console.log(data.result);
            
            if(data.result === 0){
              alert('해당 이메일을 가진 사용자가 없습니다.')
            }else{
              window.location.href = `/chat?room=${data.result}`;
              location.reload();

              setModalIsOpen(false);
            }
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
              <>
              {room.status === 0 ? (    <Link  to={`/chat?room=${room.chatRoomPk}`} key={room.chatRoomPk}>
          {room.roomName} {room.newChat>0 ? (<>({room.newChat})</>) : (<></>)}<br/>
            </Link>) : (<></>)}
              </>
       
          ))}

          </div>
          <br/>
          <br/>
          <div>
            <Link  className='chatLarge' onClick={openMemberHandler}><img src='/images/dm_50.png'></img>DM <span>+</span></Link>
            {userRooms.map(room => (
              <>
              {room.status === 1 ? ( <Link  to={`/chat?room=${room.chatRoomPk}`} key={room.chatRoomPk}>
              {room.roomName} {room.newChat>0 ? (<>({room.newChat})</>) : (<></>)}<br/>
            </Link>) : (<></>)}
              </>
       
          ))}
          </div>
    
        </div>
      </aside>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Invite Modal"
      >
        <h2>DM<button  style={{marginLeft: '230px', border: 'none', fontSize: '20px'}} onClick={() => setModalIsOpen(false) }>X</button></h2>
        <br/>
        <form>
          <label>
            <br></br>
            <input id='insertDM' onChange={inserDmHandler} type="text" style={{width: '100%', height: '40px'}} placeholder='사용자 이메일 입력'/>
            <div className='DMdiv' style={{border: '1px solid gray', width: '100%', maxHeight: '100px', overflow: 'scroll', marginTop: '2px'}}>
              {members.map(member =>(
                <p onClick={selectDmHandler} key={member.uid}>{member.email}</p>
              )
              )}
            </div>
          </label>
          <br/>
          <br/>
          <br/>
          <button type="submit" className='chatButtonp' onClick={makeDmHandler}  style={{marginLeft: '110px'} }>대화시작</button>
        </form>
      </Modal>

    </>
  );
};

export default ChatAside;