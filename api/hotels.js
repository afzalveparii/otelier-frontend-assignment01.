// api/hotels.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized access. Token missing." });
    }

    // --- SAFE PARAMETER EXTRACTION (Vercel + Local safe) ---
    const getParam = (key) => {
      if (req.query && req.query[key]) return req.query[key];
      try {
        const url = new URL(req.url || "/", `http://${req.headers?.host || "localhost"}`);
        return url.searchParams.get(key);
      } catch (e) {
        return null;
      }
    };

    const rawCityCode = getParam("cityCode");
    const checkInDate = getParam("checkInDate");
    const checkOutDate = getParam("checkOutDate");
    const adults = getParam("adults") || "1";
    const page = getParam("page") || "1";

    if (!rawCityCode || !checkInDate || !checkOutDate) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }

    const cityCode = String(rawCityCode).trim().toUpperCase();
    const safePage = Math.max(1, Number(page) || 1);
    const parsedAdults = Number(adults) || 1;

    // 1. Get Amadeus Token
    const tokenResponse = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2. Fetch Hotels by City
    const hotelListResponse = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { cityCode },
      }
    );

    const hotelList = hotelListResponse.data.data || [];

    if (hotelList.length === 0) {
      return res.status(404).json({ error: "No hotels found for given city code" });
    }

    const hotelIds = hotelList
      .map((h) => h.hotelId)
      .slice(0, 20)
      .join(",");

    // 3. Fetch Hotel Prices
    const hotelResponse = await axios.get(
      "https://test.api.amadeus.com/v3/shopping/hotel-offers",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          hotelIds,
          checkInDate,
          checkOutDate,
          adults: parsedAdults,
        },
      }
    );

    const hotels = hotelResponse.data.data || [];

    const normalizedHotels = hotels.map((item) => ({
      id: item.hotel.hotelId,
      name: item.hotel.name,
      rating: item.hotel.rating || "N/A",
      city: item.hotel.address?.cityName || cityCode,
      price: item.offers?.[0]?.price?.total || "0",
      currency: item.offers?.[0]?.price?.currency || "USD",
    }));

    res.status(200).json({
      page: safePage,
      results: normalizedHotels,
    });
  } catch (error) {
    console.error("Amadeus API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch hotels",
      details: error.response?.data || error.message,
    });
  }
}
