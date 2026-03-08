import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "otelier_favorites";

function loadFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.warn("Failed to save favorites:", e);
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((hotel) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === hotel.id);
      return exists
        ? prev.filter((fav) => fav.id !== hotel.id)
        : [...prev, hotel];
    });
  }, []);

  const isFavorite = useCallback(
    (hotelId) => favorites.some((fav) => fav.id === hotelId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
