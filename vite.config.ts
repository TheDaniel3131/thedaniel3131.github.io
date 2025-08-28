import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ViteFaviconsPlugin } from "vite-plugin-favicon";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteFaviconsPlugin("/assets/daniel.png")],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
