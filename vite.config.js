import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths so the build works at any GitHub Pages URL
  // (username.github.io/repo-name/ or a custom domain).
  base: './',
})
