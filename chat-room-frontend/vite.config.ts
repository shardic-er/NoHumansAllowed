import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Specify the desired port number here
  },
  plugins: [react(), reactRefresh()],
  resolve: {
    alias: {
      '@components': '/src/components'
    }
  },
})
