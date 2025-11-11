<script setup>
import Header from "@/components/Header.vue";
// import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <div class="relative container flex flex-col">
    <main class="container flex w-full">
      <router-view />
    </main>
    <!-- <Footer /> -->
  </div>
</template>
