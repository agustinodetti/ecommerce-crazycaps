// src/app.js
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);

// Ruta root
app.get("/", (req, res) => res.send("E-commerce Backend (catálogo) - OK"));

export default app;
