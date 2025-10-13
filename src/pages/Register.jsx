import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../Services/authService";
import { Alert } from "@mui/material";
import bg from "../assets/authbg.jpg";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
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
      await registerUser(data);
      setAlertMsg("Registration successful!");
      setAlertType("success");
      setShowAlert(true);
      reset();
      setTimeout(() => {
        setShowAlert(false);
        navigate("/login"); 
      }, 1500);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed!";
      setAlertMsg(msg);
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-[#BF092F]">
          Create Account
        </h2>

        {showAlert && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {alertMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300  px-4 py-2 rounded-md ring-1  ring-black focus:ring-[#BF092F] outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
