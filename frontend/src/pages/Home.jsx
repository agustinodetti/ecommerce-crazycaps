import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        const payload = res?.data;
        const list = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : [];
        setProducts(list);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-700 dark:via-blue-600 dark:to-cyan-600 text-white">
          <div className="px-6 py-10 sm:px-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Descubrí tus próximas gorras favoritas</h1>
              <p className="mt-3 text-white/90">Calidad premium, diseños únicos y envíos a todo el país.</p>
            </div>
            <Link to="/" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-5 py-3 rounded-lg shadow">Ver ofertas</Link>
          </div>
        </div>

        <header className="mt-8 sm:mt-10 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">🧢 Catálogo de productos</h2>
        </header>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden animate-pulse">
                  <div className="w-full h-56 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </div>
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </section>
    </div>
  );
}
