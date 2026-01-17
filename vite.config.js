import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  
  // Set the base path for static deployment.
  // Use '/' if deploying to the root of a domain (e.g., example.com).
  // Change to '/my-repo-name/' if deploying to GitHub Pages in a subdirectory.
  base: '/', 

  server: {
    port: 8000,
    open: true,
  },
  
  // Build configuration for static output
  build: {
    // Output directory (default is 'dist')
    outDir: 'dist', 
    // Directory for assets within the output directory
    assetsDir: 'assets', 
    // Disable source maps for smaller, faster builds (can be set to true if needed for debugging)
    sourcemap: false,
    
    // Configure Rollup optimizations for better cache control and chunking
    rollupOptions: {
      output: {
        // Ensures clean and consistent file naming in the assets folder
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    }
  }
})