// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      // opciones por defecto en Mongoose 7 ya son suficientes
    });
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
};
