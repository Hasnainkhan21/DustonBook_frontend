import api from "../Services/api";

export const getAnalytics = async () => {
  try {
    const response = await api.get("/analytics/analytics");
    return response.data;
  } catch (error) {
    console.error("Analytics error:", error);
    throw error;
  } 
};
