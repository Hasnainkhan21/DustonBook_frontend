import React from 'react'
import './App.css'
import Home from './pages/Home'
import Books from './pages/Books'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Cart from './pages/Cart'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
