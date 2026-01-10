import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { RescueProvider } from './contexts/RescueContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RescueProvider>
        <App />
      </RescueProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
