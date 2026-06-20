import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "app",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "../eastwoodl.net",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "app/index.html"),
        login: resolve(__dirname, "app/login.html"),
        workspace: resolve(__dirname, "app/workspace.html")
      }
    }
  }
});
