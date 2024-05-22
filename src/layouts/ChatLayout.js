import React from 'react'
import Header from '../components/main/Header'
import Aside from '../components/main/Aside'
import Footer from '../components/main/Footer'
import ChatSubAside from '../components/chat/ChatSubAside'
import ChatAside from '../components/chat/ChatAside'

const DefaultLayout = ({ children }) => {
  return (
    <div>
        <Header/>
        <main>
            <ChatAside/>
            <ChatSubAside/>
            <contents>
                {children}
            </contents>
        </main>
        <Footer/>
    </div>
  )
}

export default DefaultLayout