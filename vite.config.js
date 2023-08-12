import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'
import viteCompression from 'vite-plugin-compression'

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
      vue(),
      viteCompression({
        verbose: true, // 默认即可
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz', //文件类型
      })
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
