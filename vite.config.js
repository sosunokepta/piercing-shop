import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Поддержка браузеров 2015-2018 годов (Safari 10+, iOS 10+)
    target: ['es2015', 'edge18', 'firefox60', 'chrome67', 'safari11'],
    cssTarget: 'chrome61',
    // Оптимизация размера бандла
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true
  }
})
