import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { hotelApi } from "../services/api";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const { session } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchHotels = async (filters, pageNumber = 1, append = false) => {
    const token = session?.access_token;
    
    if (!token) {
      setError("Please login to search hotels");
      return;
    }

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      const data = await hotelApi.search(
        { ...cleanFilters, page: pageNumber },
        token
      );
      
      const newHotels = data.results || [];

      setHotels((prev) => (append ? [...prev, ...newHotels] : newHotels));
      setPage(data.page ?? pageNumber);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch hotels";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <HotelContext.Provider
      value={{ hotels, loading, error, fetchHotels, page, clearError, hasSearched }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => useContext(HotelContext);
