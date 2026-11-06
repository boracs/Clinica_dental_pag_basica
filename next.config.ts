import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: genera HTML/CSS/JS para alojar en cualquier hosting (cPanel).
  output: "export",
  // Genera /contacto/index.html para que Apache/cPanel lo sirva sin configuración.
  trailingSlash: true,
  images: {
    // Sin servidor de optimización de imágenes en hosting estático.
    unoptimized: true,
  },
};

export default nextConfig;
