// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

// Vite automatically loads .env, .env.local, etc. and exposes only vars
// prefixed with VITE_ to your client bundle.
// So: define VITE_API_URL in a .env file or in Vercel Project Settings.

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // Helpful for import aliases if you want to use "@/..."
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  // Base path (leave "/" unless deploying under a subfolder)
  base: "/",

  // Output directory
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  // Optional: Uncomment to proxy local dev calls so you can write
  // fetch("/api/simulate") instead of hitting the remote service directly.
  // Make sure your backend runs locally (e.g., http://localhost:8000).
  /*
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  */
}));
