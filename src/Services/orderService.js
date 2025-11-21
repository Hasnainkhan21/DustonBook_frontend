import api from "./api"; 
import { DeliveryCharge } from "./api";
export const placeOrder = async (data) => {
  const res = await api.post("/orders/place", data); // data = { shippingDetails: {...} }
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res;
};

export const getAllOrders = async () => {
  const res = await api.get("/orders/all");
  return res;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await api.put(`/orders/update/${orderId}`, { status });
  return res;
};

//delete order
export const deleteOrder = async (orderId) => {
  const res = await api.delete(`/orders/delete/${orderId}`, {withCredentials: true});
  return res;
};
