import { useState } from "react";
import { Link } from "react-router-dom";

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return "";
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function AuthForm({
  title,
  submitLabel,
  onSubmit,
  message,
  messageType = "error",
  linkTo,
  linkLabel,
  linkPrompt,
  isSignup = false,
}) {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const age = calculateAge(dateOfBirth);
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

          {isSignup && (
            <>
              <div className="space-y-4 mt-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div className="space-y-4 mt-4">
                <span className="block text-sm font-medium text-slate-700">Gender</span>
                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      required
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Female</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <label htmlFor="dateofbirth" className="block text-sm font-medium text-slate-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateofbirth"
                  name="dateofbirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div className="space-y-4 mt-4">
                <label htmlFor="age" className="block text-sm font-medium text-slate-700">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="text"
                  value={age}
                  readOnly
                  className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 cursor-not-allowed"
                  tabIndex={-1}
                />
              </div>
            </>
          )}

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
