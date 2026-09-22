/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Plugin } from 'vite'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function cleanUrlsPlugin(): Plugin {
  return {
    name: 'vite-clean-urls-preview',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()
        const urlPath = req.url.split('?')[0]
        if (urlPath === '/' || urlPath.includes('.')) {
          return next()
        }
        const cleanPath = urlPath.replace(/^\/+|\/+$/g, '')
        const directHtml = path.resolve(__dirname, 'dist', `${cleanPath}.html`)
        const indexHtml = path.resolve(__dirname, 'dist', cleanPath, 'index.html')
        if (fs.existsSync(directHtml)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          fs.createReadStream(directHtml).pipe(res)
          return
        }
        if (fs.existsSync(indexHtml)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          fs.createReadStream(indexHtml).pipe(res)
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cleanUrlsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react')) return 'vendor';
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Use forks pool for reliable runs on Windows + CI (default 'threads' can time out
    // on the JSDOM worker under heavy parallel mounts of the full App).
    pool: 'forks',
  },
})
