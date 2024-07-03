import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy": {
        target: "https://genius.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
      "/official-proxy": {
        target: "https://api.genius.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/official-proxy/, ""),
      },
    },
  },
  base: "/",
});
