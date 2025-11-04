import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Token para llamadas del panel admin
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_ADMIN_TOKEN;
  if (token && config.url.includes("/products") && config.method !== "get") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
