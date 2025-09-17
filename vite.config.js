// vite.config.js
import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(() => {
  const repo = (process.env.GITHUB_REPOSITORY || 'Dracjulien/ASCII-Portfolio')
    .split('/').pop()
  const base = process.env.GITHUB_PAGES ? `/${repo}/` : '/'

  return {
    base,
    plugins: [reactPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.APP_VERSION || '0.0.0'),
      __GIT_SHA__: JSON.stringify(process.env.SHORT_SHA || 'dev'),
      __BUILD_TIME__: JSON.stringify(process.env.BUILD_TIME || new Date().toISOString()),
    },
    build: { outDir: 'dist' },
  }
})
