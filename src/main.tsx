import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MuiThemeProvider from './components/theme/MuiThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </StrictMode>,
)
