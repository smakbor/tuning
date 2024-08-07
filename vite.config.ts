import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteJsconfigPaths from 'vite-jsconfig-paths';
export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [react(), viteJsconfigPaths()],

  define: {
    global: 'window'
  },
  resolve: {
    alias: []
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,

    // this sets a default port to 3000
    port: 3005,

    // allow access to others machine if other machine connected to same local network
    host: true
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
});
