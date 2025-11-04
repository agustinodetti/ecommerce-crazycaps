import { useEffect, useState } from "react";
import api from "../services/api";
import ProductForm from "../components/ProductForm";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Administrar productos</h1>
        <ProductForm
        editing={editing}
        onFinish={() => {
          setEditing(null);
          fetchProducts();
        }}
        />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow mt-6 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Nombre</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Precio</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-100">Categoría</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{p.name}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-100">${p.price}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{p.category}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
