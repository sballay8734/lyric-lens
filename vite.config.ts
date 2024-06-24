import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
// import dns from "dns";

// dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), react()],
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
});

// !TODO: ESLint not working
