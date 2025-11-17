// src/routes/upload.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { authAdmin } from "../middleware/authAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configurar multer para guardar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: (req, file, cb) => {
    // Nombre único: timestamp + nombre original
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  },
});

// Filtrar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de imagen (.jpg, .jpeg, .png, .webp)"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
  fileFilter: fileFilter,
});

// Endpoint para subir una imagen
router.post("/", authAdmin, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se proporcionó ninguna imagen" });
    }

    // Devolver la URL de la imagen
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      imageUrl: imageUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    res.status(500).json({ error: "Error al subir la imagen" });
  }
});

// Endpoint para subir múltiples imágenes
router.post("/multiple", authAdmin, upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron imágenes" });
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({
      success: true,
      imageUrls: imageUrls,
      count: req.files.length,
    });
  } catch (error) {
    console.error("Error subiendo imágenes:", error);
    res.status(500).json({ error: "Error al subir las imágenes" });
  }
});

export default router;

