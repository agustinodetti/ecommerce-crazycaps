import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductForm from "../components/ProductForm";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Administrar productos</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
          >
            Cerrar Sesión
          </button>
        </div>
        <ProductForm
        editing={editing}
        onFinish={() => {
          setEditing(null);
          fetchProducts();
        }}
        />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow mt-6 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Nombre</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Precio</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Talle</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Stock</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Categoría</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Fotos</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const photosCount = p.photos && Array.isArray(p.photos) ? p.photos.length : (p.imageUrl ? 1 : 0);
                return (
                  <tr key={p._id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100">${typeof p.price === "number" ? p.price.toLocaleString() : p.price}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                      {p.talle || <span className="text-gray-400 dark:text-gray-500 italic">-</span>}
                    </td>
                    <td className="px-4 py-3">
                      {p.stock !== undefined ? (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          p.stock > 0 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {p.stock}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 italic">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                      {p.category || <span className="text-gray-400 dark:text-gray-500 italic">-</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-medium">
                        {photosCount} foto{photosCount !== 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setEditing(p)}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 dark:text-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
