import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  server: {
    host: true, // Exposes the server on the local network
    proxy: {
      '/api': {
        target: 'http://192.168.3.111:8080',
        changeOrigin: true,
        secure: false, // Useful for self-signed certificates or HTTP
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy Error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
    // Custom middleware to handle MIME types for .jsx files on Windows if needed
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.endsWith('.jsx')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        next();
      });
    },
  },
})
