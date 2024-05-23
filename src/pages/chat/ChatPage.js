import React from 'react'
import ChatLayout from '../../layouts/ChatLayout'
import ChatContent from '../../components/chat/ChatContent'
import '../../styles/chat.scss'


const ChatPage = () => {
  return (
    <ChatLayout>
       <ChatContent/>
    </ChatLayout>
  )
}

export default ChatPage