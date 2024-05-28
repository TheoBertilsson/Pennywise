import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/signup': 'http://localhost:3000',
      '/removeItem': 'http://localhost:3000',
      '/getTotal': 'http://localhost:3000',
      '/addBudget': 'http://localhost:3000',
      '/authenticate': 'http://localhost:3000',
      '/logout': 'http://localhost:3000'
    }
  }
})
