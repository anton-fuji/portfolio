// import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Header from './layouts/Header'
import {PERSONAL_INFO} from './mydata/data'
import Layout from './layouts';


function App() {
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`
  }, []);

  return (
    <div className='relative'>
      {/* <Header /> */}
      <Layout
    </div>
  )
}

export default App
