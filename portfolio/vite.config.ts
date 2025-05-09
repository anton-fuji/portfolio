import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
      react(),
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
      hmr: {overlay: false}
    }
})
