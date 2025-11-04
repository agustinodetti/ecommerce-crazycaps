// src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
  category: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
