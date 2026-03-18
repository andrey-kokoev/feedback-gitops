import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, '..'),
  publicDir: false,
  plugins: [
    vue({ customElement: true }),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: resolve(__dirname, '../public'),
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: {
        'widget': resolve(__dirname, '../src/widget/main.ts'),
        'widget-integration': resolve(__dirname, '../src/widget/main-integration.ts'),
        'widget-sandbox': resolve(__dirname, '../src/widget/main-sandbox.ts'),
      },
      name: 'FeedbackGitopsWidget',
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      output: {
      },
    },
  },
  resolve: {
    alias: {
      '@widget': resolve(__dirname, '../src/widget'),
    },
  },
})
