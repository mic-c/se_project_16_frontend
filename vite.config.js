import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/se_project_16_frontend/",
  server: {
    port: 5173,
    open: true,
  },
});
