import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'

// https://vitejs.dev/config/
export default defineConfig((mode, command) => {
  const env = loadEnv(mode, process.cwd())
  const { NODE_ENV } = env
  return {
    plugins: [
      viteSSR({
        build: {
          keepIndexHtml: true, //是否保留打包后client中的index页面
        },
      }),
      vue()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: "0.0.0.0",
      port: 5173
    }
  }
})
