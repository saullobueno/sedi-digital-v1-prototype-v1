import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr(),],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  base: "/"
});