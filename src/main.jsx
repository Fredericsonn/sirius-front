import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'

import { Provider } from 'react-redux';
import { store } from './store.js';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
        <ToastContainer position='top-center' autoClose={3000} />
    </Provider>
)
