import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Warn when a chunk exceeds 500KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks for better caching
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          mui: ["@mui/material", "@emotion/react", "@emotion/styled"],
          icons: ["react-icons"],
          toast: ["react-toastify"],
          socket: ["socket.io-client"],
        },
      },
    },
  },
  server: {
    // Proxy API in dev to avoid CORS issues
    proxy: {
      "/api": {
        target: "http://localhost:3006",
        changeOrigin: true,
      },
    },
  },
});
