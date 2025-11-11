<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { parseMarkdown } from "@/utils/markdown-parser.js";
import Sidebar from "@/components/Sidebar.vue";
import TableOfContents from "@/components/TableOfContents.vue";
import { sidebar } from "@/config.js";

const route = useRoute();
const router = useRouter();

const content = ref("");
const toc = ref([]);
const link = ref("");
const currentSidebar = ref([]);

async function loadArticle() {
  try {
    // 1. 获取 link 参数从路由
    const pathMatch = route.params.pathMatch;
    if (!pathMatch || pathMatch.length === 0) {
      router.push("/");
      return;
    }

    link.value = "/" + pathMatch.join("/");

    // 2. 匹配 sidebar 配置
    const subjectName = pathMatch[0];
    const matchedSidebar = sidebar.find((item) => item.text === subjectName);
    if (matchedSidebar) {
      currentSidebar.value = [matchedSidebar];
    }

    // 3. 加载 markdown 文件
    const response = await fetch(`/docs${link.value}.md`);
    const contentType = response.headers.get("content-type") || "";

    // 文件不存在或返回 HTML（fallback）→ 跳转首页
    if (!response.ok || contentType.includes("text/html")) {
      router.push("/");
      return;
    }
    const markdown = await response.text();

    // 4. 解析 markdown
    const result = parseMarkdown(markdown);
    content.value = result.html;
    toc.value = result.toc;

    // 5. 渲染数学公式
    await nextTick();
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise();
    }
  } catch (error) {
    console.error("加载文章失败:", error);
    router.push("/");
  }
}

// 监听路由变化，重新加载文章
watch(
  () => route.params.pathMatch,
  () => {
    loadArticle();
  },
  { deep: true },
);

onMounted(() => {
  loadArticle();
});
</script>

<template>
  <div class="container mx-auto mt-6 flex justify-center">
    <!-- 侧边栏 -->
    <Sidebar class="w-2/12" :items="currentSidebar" :currentLink="link" />

    <!-- 文章内容 -->
    <article class="markdown-body container mx-auto w-8/12" v-html="content"></article>

    <!-- TOC 目录 -->
    <TableOfContents class="w-2/12" :items="toc" />
  </div>
</template>

<style>
/* 覆盖 github-markdown-css */
.markdown-body h1 {
  text-align: center;
}

/* 覆盖 github-markdown-css 的 pre 样式 */
.markdown-body pre {
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
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
