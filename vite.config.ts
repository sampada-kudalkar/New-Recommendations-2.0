import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/New-Recommendations-2.0/',
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    strictPort: false,
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    strictPort: false,
  },
})
