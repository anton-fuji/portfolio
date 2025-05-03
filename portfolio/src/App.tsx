// import { useState } from 'react'
import { useEffect } from 'react'
import './styles/App.css'
import {PERSONAL_INFO} from './mydata/data'
import Layout from './layouts';
import Profile from './pages/Profile';
import Background from './components/Background';
import ProjectsPage from './pages/projects/Projects';





function App() {
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Background />
      <div className='relative'>
      <Layout>
          <Profile />

          <ProjectsPage />
      </Layout>
      </div>
    </div>
  )
}

export default App
