import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../Services/authService";
import { Alert } from "@mui/material";
import bg from "../assets/authbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const showMessage = (msg, type = "error") => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const onSubmit = async (data) => {
    try {
      // loginUser now returns res.data directly (from authService cleanup)
      const res = await loginUser(data);
      // Support various server response shapes
      login(res?.user || res);
      showMessage("Login successful!", "success");
      reset();
      navigate("/");
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || "Login failed!";
      showMessage(msg, "error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl text-center text-[#BF092F] font-bold">
          Login to Continue
        </h1>

        {showAlert && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {alertMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md ring-1 ring-gray-300 focus:ring-[#BF092F] outline-none transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md ring-1 ring-gray-300 focus:ring-[#BF092F] outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            id="login-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#BF092F] text-white py-2 rounded-md hover:bg-[#a30828] transition disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-700 mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#BF092F] font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
