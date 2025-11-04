import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover bg-gray-100 dark:bg-gray-700"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23222'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaa' font-size='28' font-family='Arial'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
        }}
      />
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
