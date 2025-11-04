// src/routes/product.routes.js
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// Públicas
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protegidas (admin)
router.post("/", authAdmin, createProduct);
router.put("/:id", authAdmin, updateProduct);
router.delete("/:id", authAdmin, deleteProduct);

export default router;