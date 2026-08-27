import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    vike(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        svgProps: {
          fill: "currentColor",
        },
      },
    }),
  ],
  server: {
    hmr: { overlay: false },
  },
});
