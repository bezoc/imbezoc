import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'chart': ['chart.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  },
  optimizeDeps: {
    include: ['chart.js']
  }
});