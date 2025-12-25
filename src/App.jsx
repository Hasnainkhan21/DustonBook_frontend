import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import Books from './pages/Books'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import UserModal from './components/UserModal'
import { Route, Routes } from "react-router-dom";   
import DashboardLayout from './Admin/DashboardLayout'
import Adminorders from './Admin/pages/Adminorders'
import Analytics from './Admin/pages/Analytics'
import Adminbooks from './Admin/pages/Adminbooks'
import Adminblogs from './Admin/pages/Adminblogs'
import AdminBookList from './Admin/pages/AdminBookList'
import AdminBlogList from './Admin/pages/Adminbloglist'
import Navbar from './components/Navbar'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import ProtectedRoute from './Routes/ProtectedRoute'
import AdminRoute from './Routes/AdminRoute'

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
      <div className="h-16 md:h-20" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute> } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modal" element={<UserModal />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        >
          <Route path="books" element={<Adminbooks />} />
          <Route path="blogs" element={<Adminblogs />} />
          <Route path="orders" element={<Adminorders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="booklist" element={<AdminBookList />} />
          <Route path="blogslist" element={<AdminBlogList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
 