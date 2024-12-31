import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests from /api/google to the Google OAuth endpoint
      '/api/google': {
        target: 'https://oauth2.googleapis.com', // Google OAuth server
        changeOrigin: true,
        secure: true, // Enable secure SSL
        rewrite: (path) => path.replace(/^\/api\/google/, ''), // Remove /api/google prefix
      },
      // Add other proxy settings as needed for your app's API endpoints
    },
  },
})
