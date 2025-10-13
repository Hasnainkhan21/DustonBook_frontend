import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../Services/authService";
import { Alert } from "@mui/material";
import bg from "../assets/authbg.jpg";
import {Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [showAlert, setShowAlert] = useState(false);
   const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      setAlertMsg("Login successful!");
      setAlertType("success");
      setShowAlert(true);
      reset();
      setTimeout(() => {
        setShowAlert(false);
        navigate("/"); 
      }, 1500);
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Login failed!";
      setAlertMsg(msg);
      setAlertType("error");
      setShowAlert(true);
    }
    setTimeout(() => setShowAlert(false), 4000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-[#BF092F]">
          Welcome Back
        </h2>

        {showAlert && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {alertMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md ring-1  ring-black focus:ring-[#BF092F] outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min length is 6" },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md ring-1  ring-black focus:ring-[#BF092F] outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#BF092F] text-white py-2 rounded-md hover:bg-[#a30828] transition"
          >
            Login
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-gray-700 mt-3">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#BF092F] font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
