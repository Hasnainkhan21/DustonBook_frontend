import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../Services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const loadCart = useCallback(async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const res = await api.get("/cart");
      const items = res.data?.items || [];
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      // Silently ignore auth/empty-cart errors; warn on real failures
      if (error.response?.status !== 401 && error.response?.status !== 404) {
        console.warn("Cart load failed:", error.message);
      }
      setCartCount(0);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <CartContext.Provider value={{ cartCount, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
