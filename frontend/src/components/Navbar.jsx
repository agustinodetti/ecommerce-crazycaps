import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextDark = stored ? stored === "dark" : prefersDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between w-full">
        <Link to="/" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          CrazyCaps 🧢
        </Link>

        <div className="flex items-center gap-5 text-gray-700 dark:text-gray-300 font-medium">
          <Link to="/" className="hover:text-blue-700 dark:hover:text-blue-400">
            Inicio
          </Link>
          <Link to="/cart" className="relative hover:text-blue-700 dark:hover:text-blue-400">
            Carrito
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-blue-600 text-white rounded-full px-1.5 py-0.5">
                {cart.length}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link to="/admin" className="hover:text-blue-700 dark:hover:text-blue-400">
              Admin
            </Link>
          ) : (
            <Link to="/login" className="hover:text-blue-700 dark:hover:text-blue-400">
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="ml-1 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
