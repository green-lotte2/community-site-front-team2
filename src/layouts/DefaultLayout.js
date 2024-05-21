import React from 'react'
import Header from '../components/main/Header'
import Aside from '../components/main/Aside'
import Footer from '../components/main/Footer'
import Contents from '../components/main/Contents'

const DefaultLayout = ({ children }) => {
  return (
    <div>
        <Header/>
        <main>
            <Aside/>
            <contents>
                {children}
            </contents>
        </main>
        <Footer/>
    </div>
  )
}

export default DefaultLayout