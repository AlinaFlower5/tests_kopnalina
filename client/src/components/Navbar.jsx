import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Navbar() {
  const { user, logout } = useUser();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { to: "/", label: "Тесты" },
    { to: "/history", label: "История", auth: true },
  ];
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-extrabold text-xl sm:text-2xl tracking-tight select-none"
          >
            <span className="inline-block w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md animate-spin-slow">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v4m0 8v4m8-8h-4M4 12H8"
                />
              </svg>
            </span>
            CareerPath
          </Link>
          <div className="hidden sm:flex items-center gap-2 sm:gap-4">
            {navLinks.map(
              (link) =>
                (!link.auth || user) && (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium transition-all duration-200 text-white/90 hover:bg-white/10 text-sm sm:text-base ${
                      location.pathname === link.to ? "bg-white/20" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="sm:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/10 text-white focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Открыть меню"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="hidden sm:flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <span className="text-white/90 font-semibold px-2 text-xs sm:text-base">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-white/20 text-white font-semibold hover:bg-red-500/80 transition-all text-xs sm:text-base"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-white/20 text-white font-semibold hover:bg-blue-800/80 transition-all text-xs sm:text-base"
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg bg-white/20 text-white font-semibold hover:bg-green-500/80 transition-all text-xs sm:text-base"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gradient-to-r from-blue-600 to-blue-400 px-2 pb-2 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map(
              (link) =>
                (!link.auth || user) && (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-lg font-medium text-white/90 hover:bg-white/10 text-base transition-all duration-200 ${
                      location.pathname === link.to ? "bg-white/20" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
            )}
            {user ? (
              <>
                <span className="text-white/90 font-semibold px-2 text-base">
                  {user.email}
                </span>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-red-500/80 transition-all text-base"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-blue-800/80 transition-all text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-green-500/80 transition-all text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
