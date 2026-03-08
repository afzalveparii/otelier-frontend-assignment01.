import { useState } from "react";

const today = new Date().toISOString().slice(0, 10);

function validateDates(checkIn, checkOut) {
  if (!checkIn || !checkOut) return null;
  if (new Date(checkOut) <= new Date(checkIn)) {
    return "Check-out date must be after check-in date";
  }
  return null;
}

export default function SearchForm({ filters, onFiltersChange, onSubmit, loading }) {
  const [dateError, setDateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: name === "adults" ? Math.max(1, parseInt(value, 10) || 1) : value,
    };
    onFiltersChange(newFilters);
    if (name === "checkInDate" || name === "checkOutDate") {
      setDateError(validateDates(newFilters.checkInDate, newFilters.checkOutDate) || "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateDates(filters.checkInDate, filters.checkOutDate);
    if (err) {
      setDateError(err);
      return;
    }
    setDateError("");
    onSubmit(filters, 1, false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <div>
        <label htmlFor="cityCode" className="block text-sm font-medium text-slate-700 mb-1">
          City Code
        </label>
        <input
          id="cityCode"
          type="text"
          name="cityCode"
          placeholder="e.g. PAR, LON, NYC"
          value={filters.cityCode}
          className="w-full border border-slate-300 p-2.5 rounded-lg uppercase focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="checkInDate" className="block text-sm font-medium text-slate-700 mb-1">
          Check-in
        </label>
        <input
          id="checkInDate"
          type="date"
          name="checkInDate"
          min={today}
          value={filters.checkInDate}
          className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="checkOutDate" className="block text-sm font-medium text-slate-700 mb-1">
          Check-out
        </label>
        <input
          id="checkOutDate"
          type="date"
          name="checkOutDate"
          min={filters.checkInDate || today}
          value={filters.checkOutDate}
          className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="adults" className="block text-sm font-medium text-slate-700 mb-1">
          Adults
        </label>
        <input
          id="adults"
          type="number"
          name="adults"
          min="1"
          value={filters.adults}
          className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleChange}
        />
      </div>

      {dateError && (
        <p className="col-span-full text-red-600 text-sm" role="alert">
          {dateError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`col-span-1 md:col-span-4 py-3 rounded-lg font-semibold text-white bg-blue-600 transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? "Searching..." : "Search Hotels"}
      </button>
    </form>
  );
}
