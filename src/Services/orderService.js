import api from "./api"; // your axios instance (with withCredentials)

export const placeOrder = async (data) => {
  const res = await api.post("/orders/place", data); // data = { shippingDetails: {...} }
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/orders/all");
  return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await api.put(`/orders/update/${orderId}`, { status });
  return res.data;
};
