// vite.config.ts
// Simplified configuration file for Vite

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Export a basic configuration that should work with minimal issues
export default defineConfig({
  // Basic React plugin with default settings
  plugins: [react()],
  
  // Keep only essential server settings
  server: {
    port: 5173,
    open: true
  },
  
  // Simplified build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Basic sourcemaps for debugging
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  
  // Minimal optimization to avoid conflicts
  optimizeDeps: {
    include: ['react', 'react-dom']
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './assets')
    },
  },
  
  // Explicitly set the public directory
  publicDir: 'public',
  
  // Add a base URL
  base: './',
  
  // Configure assets handling
  assetsInclude: ['**/*.mp4'],
});