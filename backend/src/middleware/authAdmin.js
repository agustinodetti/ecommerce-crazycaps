// src/middleware/authAdmin.js
export const authAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  
    if (!token || token !== ADMIN_TOKEN) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
  
    next();
  };
  