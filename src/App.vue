<script setup>
import Header from "@/components/Header.vue";
// import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <main :class="['relative container mx-auto']">
    <router-view />
  </main>
  <!-- <Footer /> -->
</template>
