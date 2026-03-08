import { Heart } from "lucide-react";

export default function HotelCard({ hotel, isFavorite, onToggleFavorite }) {
  const currency = hotel.currency || "USD";

  return (
    <article
      className="relative border border-slate-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[180px]"
    >
      <div>
        <h2 className="font-semibold text-lg text-slate-800 pr-10">{hotel.name}</h2>
        <p className="text-slate-600 text-sm">City: {hotel.city}</p>
        <p className="text-amber-600 text-sm font-medium mt-1">
          Rating: {hotel.rating}
        </p>
        <p className="font-bold text-blue-600 text-xl mt-2">
          {hotel.price}{" "}
          <span className="text-sm text-slate-500 font-normal">{currency}</span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => onToggleFavorite(hotel)}
        className="absolute top-4 right-4 p-1 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <Heart className="w-6 h-6 text-red-500 fill-current" />
        ) : (
          <Heart className="w-6 h-6 text-slate-300 hover:text-red-400" />
        )}
      </button>
    </article>
  );
}
