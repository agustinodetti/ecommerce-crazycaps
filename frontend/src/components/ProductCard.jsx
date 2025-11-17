import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { getFullImageUrl } from "../utils/image";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = useMemo(() => {
    const images = [];
    if (product.photos && Array.isArray(product.photos)) {
      product.photos.forEach((url) => {
        const full = getFullImageUrl(url);
        if (full && !images.includes(full)) images.push(full);
      });
    }
    const fallback = getFullImageUrl(product.imageUrl);
    if (fallback && !images.includes(fallback)) {
      images.push(fallback);
    }
    if (images.length === 0) {
      images.push(
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23222'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaa' font-size='28' font-family='Arial'%3EImagen no disponible%3C/text%3E%3C/svg%3E"
      );
    }
    return images;
  }, [product.imageUrl, product.photos]);

  useEffect(() => {
    if (currentImageIndex >= productImages.length) {
      setCurrentImageIndex(0);
    }
  }, [productImages, currentImageIndex]);

  const goPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <Link to={`/product/${product._id}`} className="block cursor-pointer relative">
        <img
          src={productImages[currentImageIndex]}
          alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
          className="w-full h-56 object-cover bg-gray-100 dark:bg-gray-700"
        />
        {productImages.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition"
              aria-label="Imagen anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition"
              aria-label="Imagen siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {productImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </Link>
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100 min-h-[28px] line-clamp-1">{product.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          ${typeof product.price === "number" ? product.price.toLocaleString() : product.price}
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver detalles
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
