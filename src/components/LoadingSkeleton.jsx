export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm animate-pulse"
          aria-hidden="true"
        >
          <div className="h-5 bg-slate-200 rounded mb-3 w-3/4" />
          <div className="h-3 bg-slate-200 rounded mb-2 w-1/2" />
          <div className="h-3 bg-slate-200 rounded mb-2 w-1/3" />
          <div className="h-4 bg-slate-200 rounded w-1/4 mt-4" />
        </div>
      ))}
    </div>
  );
}
