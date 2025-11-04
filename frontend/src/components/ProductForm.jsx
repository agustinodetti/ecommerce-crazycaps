import { useState, useEffect } from "react";
import api from "../services/api";

export default function ProductForm({ editing, onFinish }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else
      setForm({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        imageUrl: "",
      });
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/products/${editing._id}`, form);
    else await api.post("/products", form);
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
        <input
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio</label>
          <input
            type="number"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Imagen URL</label>
        <input
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Imagen URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
        <textarea
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition">
        {editing ? "Actualizar" : "Crear producto"}
      </button>
    </form>
  );
}
