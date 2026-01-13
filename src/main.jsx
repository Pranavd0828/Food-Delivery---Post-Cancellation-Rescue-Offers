import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { RescueProvider } from './contexts/RescueContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotificationProvider>
          <FavoritesProvider>
            <RescueProvider>
              <App />
            </RescueProvider>
          </FavoritesProvider>
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
