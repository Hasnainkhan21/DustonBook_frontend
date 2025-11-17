
import App from './App.jsx'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { CartProvider } from './context/CartContext.jsx'
createRoot(document.getElementById('root')).render(
<CartProvider>
  <StrictMode>
    <App />
  </StrictMode>
</CartProvider>
)
