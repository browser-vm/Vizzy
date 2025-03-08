import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Optimize build settings
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    // Reduce memory usage
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: false,
    },
  },
});