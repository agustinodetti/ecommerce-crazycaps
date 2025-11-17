export const getFullImageUrl = (url) => {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const base = import.meta.env.VITE_API_URL?.replace(/\/api$/, "") || "";
  if (trimmed.startsWith("/")) return `${base}${trimmed}`;
  return `${base}/${trimmed}`;
};

