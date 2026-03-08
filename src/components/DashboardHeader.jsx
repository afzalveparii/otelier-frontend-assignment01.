import { useAuth } from "../context/AuthContext";

export default function DashboardHeader() {
  const { session, signOut } = useAuth();

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hotel Search</h1>
        {session?.user?.email && (
          <p className="text-sm text-slate-600 mt-0.5">
            Logged in as {session.user.email}
          </p>
        )}
      </div>
      <button
        onClick={signOut}
        className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
      >
        Logout
      </button>
    </header>
  );
}
