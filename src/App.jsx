import React from 'react'
import './App.css'
import Home from './pages/Home'
import Books from './pages/Books'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import UserModal from './components/UserModal'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './Admin/DashboardLayout'
import Adminorders from './Admin/pages/Adminorders'
import Analytics from './Admin/pages/Analytics'
import Adminbooks from './Admin/pages/Adminbooks'
import Adminblogs from './Admin/pages/Adminblogs'
import AdminBookList from './Admin/pages/AdminBookList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modal" element={<UserModal />} />
      

      {/* admin panel */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="books" element={<Adminbooks />} />
        <Route path="blogs" element={<Adminblogs />} />
        <Route path="orders" element={<Adminorders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="booklist" element={<AdminBookList />} />
      </Route>
      </Routes>

    </Router>
  )
}

export default App
