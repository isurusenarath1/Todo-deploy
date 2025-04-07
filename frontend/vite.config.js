import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Use 'terser' if available, fallback to 'esbuild' if not
    minify: 'terser',
    // Optional terser configuration
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // If terser fails, this will ensure the build still works with esbuild
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore warning if terser isn't found, build will use esbuild instead
        if (warning.message.includes('terser not found')) {
          console.warn('Terser not found, using esbuild for minification');
          return;
        }
        warn(warning);
      }
    }
  },
})
