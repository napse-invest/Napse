import React from 'react'
import ReactDOM from 'react-dom/client'
// import './assets/index.css'
import App from './App'

// Translations
import Languages from './components/Languages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Languages>
      <App />
    </Languages>
  </React.StrictMode>
)
