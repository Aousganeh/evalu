import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    allowedHosts: [
      'assured-goshawk-topical.ngrok-free.app',
      'localhost',
      '.ngrok-free.app'
    ]
  }
})
