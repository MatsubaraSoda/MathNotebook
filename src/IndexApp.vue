<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import HomePage from './pages/HomePage.vue'
</script>

<template>
  <div id="index-container">
    <AppHeader />
    <main class="main-content">
      <HomePage />
    </main>
    <AppFooter />
  </div>
</template>

<style>
#index-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
