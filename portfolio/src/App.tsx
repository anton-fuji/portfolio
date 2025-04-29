// import { useState } from 'react'
import { useEffect } from 'react'
import './styles/App.css'
import {PERSONAL_INFO} from './mydata/data'
import Layout from './layouts';



function App() {
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`
  }, []);

  return (
    <div className='relative'>
      <Layout>
        {/* ここに HeroSection などを入れる */}
      </Layout>
      
    </div>
  )
}

export default App
