// src/controllers/product.controller.js
import Product from "../models/Product.js";


// === CRUD ===

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error al crear producto" });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};



/**
 * GET /api/products
 * Lista todos los productos (con paginación simple opcional)
 */
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 50, q, category } = req.query;

    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.json({ data: products, meta: { total, page: Number(page), limit: Number(limit) } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

/**
 * GET /api/products/:id
 * Obtener detalle de producto por id
 */
export const getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};
