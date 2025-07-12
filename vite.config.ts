import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cloudflare from '@hono/vite-cloudflare-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cloudflare({
      entry: 'functions/_worker.ts',
    }),
  ],
})