import { useState, useEffect } from "react";
import api from "../services/api";
import { getFullImageUrl } from "../utils/image";

export default function ProductForm({ editing, onFinish }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    imageUrl: "",
    talle: "",
    photos: [],
  });
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        photos: editing.photos && Array.isArray(editing.photos) ? editing.photos : [],
      });
      // Cargar previews de imágenes existentes
      const existingImages = [];
      if (editing.imageUrl) existingImages.push(editing.imageUrl);
      if (editing.photos && Array.isArray(editing.photos)) {
        existingImages.push(...editing.photos.filter(p => p && p.trim()));
      }
      setPreviewImages(existingImages);
    } else {
      setForm({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        imageUrl: "",
        talle: "",
        photos: [],
      });
      setPreviewImages([]);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Preparar datos: si hay photos, usarlos; si no, usar imageUrl como fallback
    const dataToSend = {
      ...form,
      // Si hay photos, enviarlos; si no, mantener imageUrl para compatibilidad
      photos: form.photos && form.photos.length > 0 ? form.photos : undefined,
    };
    if (editing) await api.put(`/products/${editing._id}`, dataToSend);
    else await api.post("/products", dataToSend);
    onFinish();
  };

  const addPhoto = () => {
    const url = prompt("Ingresa la URL de la imagen:");
    if (url && url.trim()) {
      setForm({
        ...form,
        photos: [...(form.photos || []), url.trim()],
      });
    }
  };

  const addPhotoDirectly = () => {
    setForm({
      ...form,
      photos: [...(form.photos || []), ""],
    });
  };

  const removePhoto = (index) => {
    const newPhotos = form.photos.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setForm({ ...form, photos: newPhotos });
    setPreviewImages(newPreviews);
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validar tipos de archivo
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert("Solo se permiten archivos .jpg, .jpeg, .png o .webp");
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const token = localStorage.getItem("adminToken") || import.meta.env.VITE_ADMIN_TOKEN;
        const response = await fetch(`${import.meta.env.VITE_API_URL.replace("/api", "")}/api/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }

        const data = await response.json();
        return data.imageUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Agregar las URLs a las fotos
      const newPhotos = [...form.photos, ...uploadedUrls];
      const newPreviews = [...previewImages, ...uploadedUrls];
      
      // Si no hay imageUrl, usar la primera como principal
      const newImageUrl = !form.imageUrl && uploadedUrls.length > 0 ? uploadedUrls[0] : form.imageUrl;
      
      setForm({ ...form, photos: newPhotos, imageUrl: newImageUrl });
      setPreviewImages(newPreviews);
    } catch (error) {
      console.error("Error subiendo imágenes:", error);
      alert("Error al subir las imágenes. Intenta nuevamente.");
    } finally {
      setUploading(false);
      // Limpiar el input
      e.target.value = "";
    }
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
          <input
            type="number"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stock disponible"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>
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
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Talle <span className="text-gray-500 text-xs">(ej: "ajustable", "7 - 1/8", "58")</span>
        </label>
        <input
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Talle (opcional)"
          value={form.talle}
          onChange={(e) => setForm({ ...form, talle: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Fotos del producto
        </label>
        <div className="space-y-3">
          {/* Selector de archivos */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {uploading ? "Subiendo..." : "Haz clic para seleccionar imágenes"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                JPG, JPEG, PNG, WEBP (máx. 5MB cada una)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Previews de imágenes subidas */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {previewImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={getFullImageUrl(imageUrl)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23222'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaa' font-size='14'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newPhotos = form.photos.filter((_, i) => i !== index);
                      const newPreviews = previewImages.filter((_, i) => i !== index);
                      setForm({ ...form, photos: newPhotos, imageUrl: index === 0 && newPreviews.length > 0 ? newPreviews[0] : form.imageUrl });
                      setPreviewImages(newPreviews);
                    }}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    title="Eliminar imagen"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      Principal
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Opción alternativa: URL manual (compatibilidad) */}
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              O agregar URL manualmente
            </summary>
            <div className="mt-2 space-y-2">
              <input
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Imagen principal URL (opcional)"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addPhotoDirectly}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition"
                >
                  + Agregar URL
                </button>
                <button
                  type="button"
                  onClick={addPhoto}
                  className="flex-1 px-4 py-2 bg-blue-200 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium transition"
                >
                  + Con prompt
                </button>
              </div>
              {form.photos && form.photos.length > 0 && (
                <div className="space-y-2">
                  {form.photos.map((photo, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`URL de la imagen ${index + 1}`}
                        value={photo}
                        onChange={(e) => {
                          const newPhotos = [...form.photos];
                          newPhotos[index] = e.target.value;
                          setForm({ ...form, photos: newPhotos });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </details>
          
          {(previewImages.length > 0 || (form.photos && form.photos.length > 0)) && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {previewImages.length || form.photos.filter(p => p && p.trim()).length} foto(s) configurada(s)
            </p>
          )}
        </div>
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
