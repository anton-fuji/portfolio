// import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Header from './layouts/Header'
import {PERSONAL_INFO} from './mydata/data'



function App() {
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`
  }, []);

  return (
    <div className='relative'>
      {/* <Header /> */}
      
    </div>
  )
}

export default App
