# Configuración de Subida de Imágenes

## Pasos para habilitar la subida de imágenes

### 1. Instalar multer
```bash
cd backend
npm install multer
```

### 2. Crear carpeta de uploads
Crea la carpeta `uploads` en la raíz del backend:
```bash
mkdir uploads
```

**Nota:** Esta carpeta debe estar en `backend/uploads/` (al mismo nivel que `src/`)

### 3. Reiniciar el servidor
```bash
npm run dev
```

## Estructura esperada:
```
backend/
├── src/
├── uploads/          ← Crear esta carpeta
└── package.json
```

## Endpoints creados:
- `POST /api/upload` - Subir una imagen
- `POST /api/upload/multiple` - Subir múltiples imágenes

## Notas:
- Las imágenes se guardan en `backend/uploads/`
- Se sirven desde `http://localhost:5000/uploads/`
- Tamaño máximo: 5MB por imagen
- Formatos permitidos: .jpg, .jpeg, .png, .webp

