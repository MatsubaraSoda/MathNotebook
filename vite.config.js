import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',  // 多页应用模式，禁用 SPA fallback
  plugins: [
    vue(),
    vueDevTools(),
    // 监听 Markdown 文件变化，自动刷新页面
    {
      name: 'reload-on-md-change',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.md')) {
          console.log(`[md] ${file} 文件已更改，正在刷新页面...`)
          server.ws.send({
            type: 'full-reload',
            path: '*'
          })
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@docs': fileURLToPath(new URL('./public/docs', import.meta.url))
    },
  },
  server: {
    // host: '0.0.0.0',  // 监听所有网络接口，允许容器外部访问
    // port: 5173,
    watch: {
      // 确保监听 public 目录下的文件变化
      ignored: ['!**/public/**']
      // usePolling: true,  // WSL2 环境需要轮询模式
    }
  },
  
  // MPA 配置
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        article: resolve(__dirname, 'article.html'),
      }
    }
  }
})
