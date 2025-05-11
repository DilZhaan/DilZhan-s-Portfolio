import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'

// Read homepage from package.json
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, 'package.json'), 'utf8')
)

// Extract base path from homepage or fallback to environment variable
const getBasePath = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL
  }
  
  if (packageJson.homepage) {
    const url = new URL(packageJson.homepage)
    return url.pathname
  }
  
  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: getBasePath(),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure asset paths are relative
    assetsInlineLimit: 0,
    // Configure proper MIME types
    rollupOptions: {
      output: {
        // Use standard .js extension for better compatibility
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
})