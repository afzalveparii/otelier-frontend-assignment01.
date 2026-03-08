import { useState } from "react";
import { useHotels } from "../context/HotelContext";
import { useFavorites } from "../hooks/useFavorites";
import PriceChart from "../components/PriceChart";
import DashboardHeader from "../components/DashboardHeader";
import SearchForm from "../components/SearchForm";
import HotelGrid from "../components/HotelGrid";
import LoadingSkeleton from "../components/LoadingSkeleton";

const SORT_OPTIONS = [
  { value: "", label: "Sort by relevance" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

export default function Dashboard() {
  const { hotels, loading, error, fetchHotels, page, clearError, hasSearched } = useHotels();
  const { favorites, toggleFavorite } = useFavorites();
  const [sortOrder, setSortOrder] = useState("");
  const getDefaultDates = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);
    return {
      checkInDate: tomorrow.toISOString().slice(0, 10),
      checkOutDate: dayAfter.toISOString().slice(0, 10),
    };
  };

  const [filters, setFilters] = useState(() => ({
    cityCode: "PAR",
    ...getDefaultDates(),
    adults: 1,
  }));

  const hotelList = Array.isArray(hotels) ? hotels : [];
  const sortedHotels = [...hotelList].sort((a, b) => {
    if (sortOrder === "low") return Number(a.price) - Number(b.price);
    if (sortOrder === "high") return Number(b.price) - Number(a.price);
    return 0;
  });

  const compareHotels = favorites.length > 0 ? favorites : sortedHotels;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <DashboardHeader />

        <SearchForm
          filters={filters}
          onFiltersChange={setFilters}
          onSubmit={fetchHotels}
          loading={loading}
        />

        {compareHotels.length > 0 && (
          <section
            className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            aria-label="Price comparison chart"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Price Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Showing {compareHotels.length}{" "}
                {favorites.length > 0 ? "favorites" : "listed"} hotels
              </p>
            </div>
            <PriceChart hotels={compareHotels} />
          </section>
        )}

        {loading && hotelList.length === 0 && <LoadingSkeleton />}

        {error && (
          <div
            role="alert"
            className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex justify-between items-center"
          >
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Dismiss
            </button>
          </div>
        )}

        {sortedHotels.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <span className="text-sm text-slate-600">
              {sortedHotels.length} hotels found (Page {page})
            </span>
            <label htmlFor="sort-select" className="sr-only">
              Sort hotels
            </label>
            <select
              id="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-slate-300 p-2 rounded-lg bg-white text-slate-700"
              aria-label="Sort hotels by price"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {!loading && hotelList.length === 0 && !error && (
          <div
            className="text-center py-12 px-4"
            role="status"
          >
            {hasSearched ? (
              <>
                <p className="text-slate-600 font-medium mb-2">
                  No hotels with availability for these dates.
                </p>
                <p className="text-slate-500 text-sm">
                  Try different dates (within the next year) or cities like{" "}
                  <strong>PAR</strong>, <strong>LON</strong>, <strong>NYC</strong>,{" "}
                  <strong>MAD</strong>, <strong>AMS</strong>.
                </p>
              </>
            ) : (
              <p className="text-slate-500">
                Enter a city code (e.g. PAR, LON, NYC) and dates above, then click Search Hotels.
              </p>
            )}
          </div>
        )}

        <HotelGrid
          hotels={sortedHotels}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        {sortedHotels.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => fetchHotels(filters, page + 1, true)}
              disabled={loading}
              className={`px-8 py-3 rounded-full border-2 border-blue-200 bg-white text-blue-600 font-semibold shadow-sm transition ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {loading ? "Loading more..." : "Load More Hotels"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
