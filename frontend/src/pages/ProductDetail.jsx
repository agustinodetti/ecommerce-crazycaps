import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Detalle del producto</h1>
      <p>Mostrando información del producto con ID: {id}</p>
      {/* Más adelante acá mostraremos los datos reales */}
    </div>
  );
}
