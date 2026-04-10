import api from "./api";

export const placeOrder = async (data) => {
  const res = await api.post("/orders/place", data);
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

export const deleteOrder = async (orderId) => {
  const res = await api.delete(`/orders/delete/${orderId}`);
  return res.data;
};
