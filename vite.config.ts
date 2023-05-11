import { defineConfig } from 'vite'

import image from '@rollup/plugin-image'
import typescript from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), typescript(), image()],
  build: {
    target: 'esnext',
    minify: true,
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          apollo: ['@apollo/client', 'graphql']
        },
        generatedCode: {
          constBindings: true
        }
      }
    }
  }
})
