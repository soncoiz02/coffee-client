import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MuiThemeProvider from './theme/MuiThemeProvider.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MuiThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </MuiThemeProvider>
  </StrictMode>,
)
