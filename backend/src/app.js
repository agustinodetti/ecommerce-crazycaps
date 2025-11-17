// src/app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import productRoutes from "./routes/product.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (imágenes subidas)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

// Ruta root
app.get("/", (req, res) => res.send("E-commerce Backend (catálogo) - OK"));

export default app;
