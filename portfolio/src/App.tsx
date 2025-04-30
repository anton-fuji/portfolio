// import { useState } from 'react'
import { useEffect } from 'react'
import './styles/App.css'
import {PERSONAL_INFO} from './mydata/data'
import Layout from './layouts';
import Profile from './pages/Profile';



function App() {
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`
  }, []);

  return (
    <div className='relative'>
      <Layout>
        <main>
          <Profile />
        </main>
      </Layout>
      
    </div>
  )
}

export default App
