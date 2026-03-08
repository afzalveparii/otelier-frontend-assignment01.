import { Link } from "react-router-dom";

export default function AuthForm({
  title,
  submitLabel,
  onSubmit,
  message,
  messageType = "error",
  linkTo,
  linkLabel,
  linkPrompt,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
          noValidate
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-6">{title}</h1>

          {message && (
            <div
              role="alert"
              className={`mb-4 p-3 rounded-lg text-sm ${
                messageType === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete={title === "Login" ? "current-password" : "new-password"}
              required
              minLength={6}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            {submitLabel}
          </button>

          <p className="mt-6 text-sm text-slate-600 text-center">
            {linkPrompt}{" "}
            <Link to={linkTo} className="font-medium text-blue-600 hover:text-blue-700">
              {linkLabel}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
