import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Especifica el puerto aquí
    proxy: {
      '/banco1': {
        target: 'https://banco1-bcp.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/banco1/, ''),
      },
      '/banco2': {
        target: 'https://banco2-intercontinental-1.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/banco2/, ''),
      },
      '/banco3': {
        target: 'https://banco3usa.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/banco3/, ''),
      },
      '/api.gateway': {
        target: 'http://api.gateway:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api.gateway/, ''),
      },
    },
  },
});
