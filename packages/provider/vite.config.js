import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    // CSS configuration options
    modules: {
      // Enable CSS modules
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    // File extensions to be resolved
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  build: {
    // Production build configuration
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clean the output directory before building
    rollupOptions: {
      // Rollup options for bundling
      input: './index.ts', // Entry point for your application
      output: {
        // Output options for the bundled file
        dir: 'dist', // Output directory for the bundled file
        format: 'es', // Output format (es for ES modules)
        entryFileNames: 'bundle.js', // Name of the bundled file
        assetFileNames: 'assets/[name].[ext]', // Naming pattern for assets (e.g., images, fonts)
      },
    },
  },
})
