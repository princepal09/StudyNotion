import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux'
import { store } from './redux/store.js'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}> 
    <BrowserRouter> 
    <App/>
    <Toaster/>
    </BrowserRouter>
    </Provider>
     </GoogleOAuthProvider>
)
