import api from "./api";

    //getcart
export const getCart = async () => {
        try{
        const response = await api.get("/cart/");
        return response.data;
        }catch(error){ 
            console.error("GetCart error:", error);
            throw error;
        }
    }

    //addtocart
export const addToCart = async (bookId) => {
        try{
        const response = await api.post(`/cart/add`, { bookId }); 
        return response.data;
        }
        catch(error){
            console.error("AddToCart error:", error);
            throw error;
        }
    };

    //removefromcart
export const removeFromCart = async (bookId) => {
        try{
        const response = await api.delete(`/cart/remove/${bookId}`);
        return response.data;
        }catch(error){
            console.error("RemoveFromCart error:", error);
            throw error;
        }
    }

    //clearcart
export const clearCart = async () => {
        try{
        const response = await api.delete("/cart/clear");
        return response.data;
        }catch(error){
            console.error("ClearCart error:", error);
            throw error;
        }
    };

    //updatecartquantity
export const updateCartQuantity = async (bookId, quantity) => {
  const response = await api.put(`/cart/update/${bookId}`, { quantity });
  return response.data;
};


