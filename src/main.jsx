import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'

import { Provider } from 'react-redux';
import { store } from './store.js';
import Example from './components/BarChart.jsx';
import MaterialGroupChart from './components/PieChart.jsx';
import Table from './components/Table.jsx';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Table />
        <ToastContainer position='top-center' autoClose={3000} />
    </Provider>
)
