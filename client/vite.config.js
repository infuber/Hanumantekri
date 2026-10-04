import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          'vendor': ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'zustand'],
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },
  server: {
    port: parseInt(process.env.PORT) || 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
    },
  },
})
