import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    host: '0.0.0.0',  // Expose the server to external network
    port: 5173,        // Use the same port (or change it if needed)
  }
})
