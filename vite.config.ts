import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['stream', 'buffer']
    })
  ],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increased warning threshold
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})

