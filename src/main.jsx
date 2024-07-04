import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App2 from './App2.jsx'
import StuGraph from './dashboard/StuGraph.jsx'
import App from './App.jsx'
import { StudentProfileProvider } from './StudentProfileController.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <StudentProfileProvider>
  <App/>
  </StudentProfileProvider>
    
  </React.StrictMode>,
)