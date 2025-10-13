<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ArticlePage from './pages/ArticlePage.vue'
</script>

<template>
  <div id="article-container">
    <AppHeader />
    <main class="main-content">
      <ArticlePage />
    </main>
    <AppFooter />
  </div>
</template>

<style>
#article-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>

