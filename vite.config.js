import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vercel from 'vite-plugin-vercel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    vercel(),
  ],
  vercel: {
    rewrites: [
      { source: '/api/(.*)', destination: '/api/$1' },
      { source: '/(.*)', destination: '/index.html' },
    ],
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
