import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import authSlice from '../../slices/authSlice';
import { useLocation } from 'react-router-dom';

const ChatContent = () => {

    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);
    const location = useLocation();
    console.log(location)

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
            console.log(time)
            ws.current.send(`${userName} * ${time} * ${message}`);
            setMessage('');
        }
    };

    const dispatch = useDispatch();
    const authSlice = useSelector((state) => state.authSlice);

    useEffect(() => {
        setUserName(authSlice.username);
        setIsConnected(true)
    }, []);


  return (
    <>
    <div id="content">
            <h2 class="title"> 롯데-2 프로젝트팀</h2>

            <div id="chatting">
            <div className="chat">
                        {chat.map((msg, index) => {
                            const [nickname, time , text] = msg.split('*');
                            const [date, timePart] = time.trim().split(' ');
                            return (
                                <div key={index} className="chat-item">
                                    <div>
                                        <img className="chat-image" src="/images/logo.png" alt="로고" style={{ marginRight: "10px" }} />
                                    </div>
                                    <div className="chat-text">
                                        <span>{nickname.trim() +' '}</span>
                                        {date === getCurrentDate() ?
                                         (<>{ timePart.trim()}</>): 
                                         (<> <span> {date.trim()}</span></>)}
                                        <p className="chat-textarea">
                                        {text.trim()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

           
            </div>
            <div class="chatInsert" style={{border: "1px solid black", padding: "10px", display: "flex", alignItems: "center"}}>
                <button class="chat-btn-attachment">+</button>
                <input type="text" class="chat-input" value={message} placeholder="메시지 입력..."  onChange={(e) => setMessage(e.target.value)}    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSend();
                                        }
                                    }}/>
                <button onClick={handleSend} class="chat-btn-send">▶</button>
            </div>
        </div>
    </>
  )
}

export default ChatContent