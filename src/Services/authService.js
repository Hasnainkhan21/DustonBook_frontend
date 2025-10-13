import axios from "axios";
import api from "../Services/api";

export  const registerUser = async (userData) => {
    try{
    const response = await api.post("/auth/register", userData);
    return response.data;
    }catch(error){
        console.error("Registration error:", error);
        throw error;
    }
}

export  const loginUser = async (credentials) => {
    try{
    const response = await api.post("/auth/login", credentials);
    return response.data;
    }catch(error){
        console.error("Login error:", error);
        throw error;
    }
}