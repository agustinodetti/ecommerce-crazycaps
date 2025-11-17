import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { getFullImageUrl } from "../utils/image";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data || res.data);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setError("Producto no encontrado");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // Opcional: mostrar notificación o mensaje de éxito
      alert("¡Producto añadido al carrito!");
    }
  };

  const handleWhatsApp = () => {
    if (!product) return;
    
    const message = encodeURIComponent(
      `Hola! Me interesa este producto:\n\n` +
      `*${product.name}*\n` +
      `Precio: $${product.price}\n` +
      `${product.talle ? `Talle: ${product.talle}\n` : ""}` +
      `${product.description ? `Descripción: ${product.description}\n` : ""}` +
      `${product.category ? `Categoría: ${product.category}` : ""}`
    );
    
    const whatsappLink = `https://wa.me/${whatsapp}?text=${message}`;
    window.open(whatsappLink, "_blank");
  };

  // Obtener todas las fotos del producto
  const productImages = useMemo(() => {
    if (!product) return [];
    const images = [];

    const addImage = (url) => {
      const fullUrl = getFullImageUrl(url);
      if (fullUrl && !images.includes(fullUrl)) {
        images.push(fullUrl);
      }
    };

    if (product.photos && Array.isArray(product.photos) && product.photos.length > 0) {
      product.photos.forEach(addImage);
    }

    if (product.imageUrl) {
      if (images.length === 0) {
        images.unshift(getFullImageUrl(product.imageUrl));
      } else {
        addImage(product.imageUrl);
      }
    }

    return images;
  }, [product]);
  const hasMultipleImages = productImages.length > 1;
  
  // Resetear índice cuando cambian las imágenes
  useEffect(() => {
    if (productImages.length > 0 && selectedImageIndex >= productImages.length) {
      setSelectedImageIndex(0);
    }
  }, [productImages, selectedImageIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {error || "Producto no encontrado"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              El producto que buscas no existe o fue eliminado.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Productos
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 dark:text-gray-200">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Galería de imágenes del producto */}
            <div className="relative">
              {productImages.length > 0 ? (
                <>
                  {/* Imagen principal */}
                  <div className="relative mb-4">
                    <img
                      src={productImages[selectedImageIndex]}
                      alt={`${product.name} - Imagen ${selectedImageIndex + 1}`}
                      className="w-full h-96 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23222'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaa' font-size='28' font-family='Arial'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    {hasMultipleImages && (
                      <>
                        {/* Botón anterior */}
                        {selectedImageIndex > 0 && (
                          <button
                            onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                            aria-label="Imagen anterior"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                        )}
                        {/* Botón siguiente */}
                        {selectedImageIndex < productImages.length - 1 && (
                          <button
                            onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                            aria-label="Imagen siguiente"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnails (solo si hay múltiples imágenes) */}
                  {hasMultipleImages && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {productImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                            selectedImageIndex === index
                              ? "border-blue-600 dark:border-blue-400"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%23222'%3E%3C/rect%3E%3C/svg%3E";
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 dark:text-gray-500">Sin imágenes disponibles</p>
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-between">
              <div>
                {product.category && (
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-3">
                    {product.category}
                  </span>
                )}
                
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {product.name}
                </h1>

                <div className="mb-6">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                    ${typeof product.price === "number" ? product.price.toLocaleString() : product.price}
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Talle:</span>{" "}
                      {product.talle ? (
                        <span className="text-gray-900 dark:text-gray-100">{product.talle}</span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 italic">No especificado</span>
                      )}
                    </p>
                    
                    {product.stock !== undefined && (
                      <p className={`text-sm font-medium ${product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {product.stock > 0 ? `✓ En stock (${product.stock} disponibles)` : "✗ Sin stock"}
                      </p>
                    )}
                  </div>
                </div>

                {product.description && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Descripción
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="space-y-3 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Añadir al carrito
                </button>
                
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Consultar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
