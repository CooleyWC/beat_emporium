import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   proxy: {
    '/api': {
      target: 'http://localhost:5555',
      changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/api/, ''),
    },
    '/create_checkout_session': {
      target: 'http://localhost:5555',
      changeOrigin: true,
    },
    '/session_status': {
      target: 'http://localhost:5555',
      changeOrigin: true,
    }
   },
  }
})
