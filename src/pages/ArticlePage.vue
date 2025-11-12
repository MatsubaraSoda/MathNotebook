<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { parseMarkdown } from "@/utils/markdown-parser.js";
import Sidebar from "@/components/Sidebar.vue";
import TableOfContents from "@/components/TableOfContents.vue";
import { sidebar } from "@/config.js";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

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
  <!-- 移动端辅助导航 -->
  <div
    :class="[
      'flex w-full sticky top-16 z-50 items-center justify-between gap-2 px-4 py-2 bg-white shadow-[inset_0_-1px] shadow-gray-200',
      'lg:hidden',
    ]"
  >
    <!-- 移动端侧边栏 -->
    <Popover :class="['relative']">
      <PopoverButton :class="['inline-flex items-center border border-neutral-200 bg-white px-3 py-2']">
        <Bars3Icon :class="['mr-2 h-5 w-5']" />
        目录
      </PopoverButton>
      <PopoverPanel
        :class="[
          'absolute left-0 z-20 w-xs overflow-hidden border border-neutral-200 bg-white shadow-xl focus:outline-none',
        ]"
      >
        <Sidebar
          :class="['max-h-[70vh] overflow-y-auto py-3']"
          :items="currentSidebar"
          :currentLink="link"
        />
      </PopoverPanel>
    </Popover>

    <!-- 移动端 TOC -->
    <Popover :class="['relative']">
      <PopoverButton :class="['inline-flex items-center border border-neutral-200 bg-white px-3 py-2']">
        <Bars3Icon :class="['mr-2 h-5 w-5']" />
        TOC
      </PopoverButton>
      <PopoverPanel
        :class="[
          'absolute right-0 z-20 w-xs pl-4 overflow-hidden border border-neutral-200 bg-white shadow-xl focus:outline-none',
        ]"
      >
        <TableOfContents
          :class="['max-h-[70vh] overflow-y-auto py-3']"
          :items="toc"
        />
      </PopoverPanel>
    </Popover>
  </div>

  <div
    :class="[
      'container mx-auto mt-4 flex justify-center gap-6',
      'lg:items-start',
    ]"
  >
    <!-- 侧边栏 -->
    <Sidebar
      :class="['hidden lg:block lg:w-2/12']"
      :items="currentSidebar"
      :currentLink="link"
    />

    <!-- 文章内容 -->
    <article
      :class="['markdown-body container mx-auto w-11/12 lg:w-8/12']"
      v-html="content"
    ></article>

    <!-- TOC 目录 -->
    <TableOfContents
      :class="[
        'hidden lg:sticky lg:top-20 lg:block lg:w-2/12 lg:self-start lg:pl-4',
      ]"
      :items="toc"
    />
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
  scroll-margin-top: 140px; /* 默认（小于 lg） */
}

@media (min-width: 1024px) {
  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    scroll-margin-top: 80px; /* >= lg 时 */
  }
}
</style>
