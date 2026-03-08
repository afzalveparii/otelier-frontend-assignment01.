import HotelCard from "./HotelCard";

export default function HotelGrid({ hotels, favorites, onToggleFavorite }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hotels.map((hotel, index) => (
        <HotelCard
          key={`${hotel.id}-${index}`}
          hotel={hotel}
          isFavorite={favorites.some((f) => f.id === hotel.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
