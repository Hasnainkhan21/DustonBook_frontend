import React, { lazy, Suspense } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute";

// Eagerly load lightweight layout components
import DashboardLayout from "./Admin/DashboardLayout";

// Lazy-load all pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Books = lazy(() => import("./pages/Books"));
const Blogs = lazy(() => import("./pages/Blogs"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Orders = lazy(() => import("./pages/Orders"));

// Admin pages — only loaded when user is admin
const Analytics = lazy(() => import("./Admin/pages/Analytics"));
const Adminbooks = lazy(() => import("./Admin/pages/Adminbooks"));
const Adminblogs = lazy(() => import("./Admin/pages/Adminblogs"));
const Adminorders = lazy(() => import("./Admin/pages/Adminorders"));
const AdminBookList = lazy(() => import("./Admin/pages/AdminBookList"));
const AdminBlogList = lazy(() => import("./Admin/pages/Adminbloglist"));

// Simple full-screen fallback for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected user routes */}
          <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
            <Route index element={<Analytics />} />
            <Route path="books" element={<Adminbooks />} />
            <Route path="blogs" element={<Adminblogs />} />
            <Route path="orders" element={<Adminorders />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="booklist" element={<AdminBookList />} />
            <Route path="blogslist" element={<AdminBlogList />} />
          </Route>
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
