import axios from "axios";

const api = axios.create({
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const hotelApi = {
  search: async (params, token) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/api/hotels?${queryParams}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },
  
};

export default api;
