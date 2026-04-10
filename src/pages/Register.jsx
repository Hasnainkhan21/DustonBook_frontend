import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../Services/authService";
import { Alert } from "@mui/material";
import bg from "../assets/authbg.jpg";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
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

  const showMessage = (msg, type = "error", redirectDelay = 0) => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      if (redirectDelay) navigate("/login");
    }, redirectDelay || 4000);
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      reset();
      showMessage("Registration successful! Redirecting...", "success", 1500);
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Registration failed!";
      showMessage(msg, "error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center text-[#BF092F]">
          Create Account
        </h1>

        {showAlert && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {alertMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md ring-1 ring-gray-300 focus:ring-[#BF092F] outline-none transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
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
            <label className="block text-gray-700 mb-1" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md ring-1 ring-gray-300 focus:ring-[#BF092F] outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            id="register-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#BF092F] text-white py-2 rounded-md hover:bg-[#a30828] transition disabled:opacity-60"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-700 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-[#BF092F] font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
