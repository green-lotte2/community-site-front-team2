import React from 'react'
import Header from '../components/main/Header'
import Aside from '../components/main/Aside'
import Footer from '../components/main/Footer'
import ChatSubAside from '../components/chat/ChatSubAside'
import ChatAside from '../components/chat/ChatAside'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import '../styles/style.scss'
import '../styles/chat.scss'

const DefaultLayout = ({ children }) => {

  return (
    <div>
       <div className="wrap">
            <ChatAside/>
            <div className="cont">
            <Header/>
            <main>
            <contents>{children}</contents>
                </main>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default DefaultLayout