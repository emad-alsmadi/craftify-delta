import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@craftify/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@craftify/types': path.resolve(__dirname, '../../packages/types/src'),
      '@craftify/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
    },
  },
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
