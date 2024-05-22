import React, { useEffect, useRef, useState } from 'react'

const ChatContent = () => {

    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);

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
            ws.current.send(`${userName} : ${message}`);
            setMessage('');
        }
    };


  return (
    <>
    <div id="content">
            <h2 class="title"> 롯데-2 프로젝트팀</h2>
            <input 
                                    type="text" 
                                    name="userName" 
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    onClick={() => setIsConnected(true)}
                                />
            <div id="chatting">
                <div class="chat">
                {chat.map((msg, index)=>(  
                    <div  key={index} class="chat-item">
                        <div >
                            <img  class="chat-image" src="/images/제목없음.png" alt="로고" style={{marginRight: "10px"}}/>
                        </div>
                        <div class="chat-text">
                             <span >개발에 반하다 </span>
                            <span> 2023.10.10</span>
                            <p  class="chat-textarea">
                            {msg}
                            </p>                   
                        </div>
                              
                    </div> 
                       ))}
                </div>
           
            </div>
            <div class="chatInsert" style={{border: "1px solid black", padding: "10px", display: "flex", alignItems: "center"}}>
                <button class="btn-attachment">+</button>
                <input type="text" class="chat-input" value={message} placeholder="메시지 입력..."  onChange={(e) => setMessage(e.target.value)}    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSend();
                                        }
                                    }}/>
                <button onClick={handleSend} class="btn-send">▶</button>
            </div>
        </div>
    </>
  )
}

export default ChatContent