import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MuiThemeProvider from './theme/MuiThemeProvider.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import Loading from './components/Loading.tsx'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MuiThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
        <ToastContainer />
        <Loading />
      </LocalizationProvider>
    </MuiThemeProvider>
  </Provider>
)
