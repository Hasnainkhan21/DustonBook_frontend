import { createContext, useContext, useState, useEffect } from "react";
import api from "../Services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  // Fetch cart count from backend
  const loadCart = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const res = await api.get("/cart");
      const items = res.data.items || [];
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      // Silently fail or log only if it's not a 401/404
      if (error.response?.status !== 401 && error.response?.status !== 404) {
        console.warn("Cart load failed:", error.message);
      }
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cartCount, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
