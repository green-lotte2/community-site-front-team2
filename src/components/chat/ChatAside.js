import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import url from '../../config/url';

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

           <Link  className='chatLarge'>
            <img src='/images/channel_50.png'></img>채널 <span> <Link to="/chatRegister" > +</Link> </span></Link><br/>
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
    </>
  );
};

export default ChatAside;