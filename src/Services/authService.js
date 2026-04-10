import api from "./api";

// Register new user
export const registerUser = async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
};

// Login user
export const loginUser = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};

// Get current authenticated user
export const getMe = async () => {
    const { data } = await api.get("/auth/me");
    return data;
};

// Logout user
export const logoutUser = async () => {
    const { data } = await api.post("/auth/logout");
    return data;
};