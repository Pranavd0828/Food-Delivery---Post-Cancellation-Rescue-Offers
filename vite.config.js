import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: '/Food-Delivery---Post-Cancellation-Rescue-Offers/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      scheduler: path.resolve(__dirname, 'node_modules/scheduler/cjs/scheduler.production.js'),
    },
  },
})
