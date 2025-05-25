// src/main.tsx
import { StrictMode } from 'react'
import { createRoot }  from 'react-dom/client'
import { renderPage }  from 'vike/react'         
import { PageShell }   from './PageShell'   
import './styles/index.css'
import './styles/App.css'

createRoot(document.getElementById('root')!).render(
  renderPage(({ Page, pageContext }) => (
    <StrictMode>
      <PageShell pageContext={pageContext}>
        <Page />
      </PageShell>
    </StrictMode>
  ))
)
