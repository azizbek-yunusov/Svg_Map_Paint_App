import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7777,
    proxy: {
      "/api": {
        target: "http://localhost:1800",
        changeOrigin: true,
        secure: false,
      },
      "/io-api": {
        target: "ws://localhost:1800",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
