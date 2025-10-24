<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { parseMarkdown } from '@/utils/markdown-parser.js'
import Sidebar from '@/components/Sidebar.vue'
import TableOfContents from '@/components/TableOfContents.vue'
import { sidebar } from '@/config.js'

const content = ref('')
const toc = ref([])
const link = ref('')
const currentSidebar = ref([])

onMounted(async () => {
  try {
    // 1. 获取 link 参数
    const params = new URLSearchParams(window.location.search)
    link.value = params.get('link')
    
    // 2. 没有 link → 404
    if (!link.value) {
      window.location.href = '/404.html'
      return
    }
    
    // 3. 匹配 sidebar 配置
    const subjectName = link.value.split('/')[1]
    const matchedSidebar = sidebar.find(item => item.text === subjectName)
    if (matchedSidebar) {
      currentSidebar.value = [matchedSidebar]
    }
    
    // 4. 加载 markdown 文件
    const response = await fetch(`/docs${link.value}.md`)
    const contentType = response.headers.get('content-type') || ''
    
    // 文件不存在或返回 HTML（fallback）→ 404
    if (!response.ok || contentType.includes('text/html')) {
      window.location.href = '/404.html'
      return
    }
    const markdown = await response.text()
    
    // 5. 解析 markdown
    const result = parseMarkdown(markdown)
    content.value = result.html
    toc.value = result.toc
    
    // 6. 渲染数学公式
    await nextTick()
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise()
    }
    
    // 7. 恢复滚动位置（开发模式下）
    if (import.meta.env.DEV) {
      const savedScroll = sessionStorage.getItem('articleScrollPosition')
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScroll),
            behavior: 'instant'
          })
          sessionStorage.removeItem('articleScrollPosition')
        }, 100)
      }
      
      // 监听页面刷新前保存滚动位置
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('articleScrollPosition', window.scrollY.toString())
      })
    }
    
  } catch (error) {
    window.location.href = '/404.html'
  }
})
</script>

<template>
  <div class="article-page">
    <div class="article-layout">
      <!-- 侧边栏 -->
      <Sidebar :items="currentSidebar" :currentLink="link" />
      
      <!-- 文章内容 -->
      <article class="markdown-body" v-html="content"></article>
      
      <!-- TOC 目录 -->
      <TableOfContents :items="toc" />
    </div>
  </div>
</template>

<style scoped>
.article-page {
  padding: 40px 0;
}

.article-layout {
  display: grid;
  grid-template-columns: 200px 1fr 150px;
  gap: 32px;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  align-items: start;
}

.markdown-body {
  max-width: 1080px;
  padding: 24px;
  box-sizing: border-box;
}
</style>

<style>
/* 覆盖 github-markdown-css */
.markdown-body h1 {
  text-align: center;
  margin-bottom: 40px;
}
</style>

<style>
/* 为所有标题添加滚动偏移 */
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  scroll-margin-top: 80px;
}
</style>