import sveltePreprocess from 'svelte-preprocess'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: { runes: false }
    })
  ],
  server: {
    port: 3000,
    hmr: { overlay: true }
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          return 'index'
        },

        assetFileNames: 'assets/css/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        compact: true
      },

      treeshake: {
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    },
    chunkSizeWarningLimit: 2000,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2015',
    cssMinify: true,
    reportCompressedSize: false,
    ssr: false
  },
  optimizeDeps: {
    include: ['svelte', 'svelte-spa-router']
  }
})
