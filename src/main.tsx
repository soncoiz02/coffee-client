import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import LoadingFullScreen from './components/Loading.tsx'
import './index.css'
import store from './redux/store.ts'
import MuiThemeProvider from './theme/MuiThemeProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MuiThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
        <ToastContainer />
        <LoadingFullScreen />
      </LocalizationProvider>
    </MuiThemeProvider>
  </Provider>
)
