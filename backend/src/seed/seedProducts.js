// src/seed/seedProducts.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Product from "../models/Product.js";

const data = [
  {
    name: "Remera deportiva",
    description: "Remera transpirable de alta calidad",
    price: 2500,
    stock: 30,
    category: "Indumentaria",
    imageUrl: "https://via.placeholder.com/400x300.png?text=Remera"
  },
  {
    name: "Gorra Racing",
    description: "Gorra ajustable con logo",
    price: 1800,
    stock: 20,
    category: "Accesorios",
    imageUrl: "https://via.placeholder.com/400x300.png?text=Gorra"
  },
  {
    name: "Sticker pack",
    description: "Pack de stickers decorativos",
    price: 350,
    stock: 100,
    category: "Merch",
    imageUrl: "https://via.placeholder.com/400x300.png?text=Sticker"
  }
];

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI no definido en .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado a Mongo - semilla iniciada");

  // Limpiar coleccion (opcional)
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log("✅ Productos seed cargados");

  mongoose.disconnect();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
