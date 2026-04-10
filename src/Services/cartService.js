import api from "./api";

export const getCart = async () => {
    const { data } = await api.get("/cart/");
    return data;
};

export const addToCart = async (bookId) => {
    const { data } = await api.post("/cart/add", { bookId });
    return data;
};

export const removeFromCart = async (bookId) => {
    const { data } = await api.delete(`/cart/remove/${bookId}`);
    return data;
};

export const clearCart = async () => {
    const { data } = await api.delete("/cart/clear");
    return data;
};

export const updateCartQuantity = async (bookId, quantity) => {
    const { data } = await api.put(`/cart/update/${bookId}`, { quantity });
    return data;
};
