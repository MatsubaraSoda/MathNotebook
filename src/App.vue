<script setup>
import Header from "@/components/Header.vue";
// import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <main :class="['container mx-auto relative']">
    <router-view />
  </main>
  <!-- <Footer /> -->
</template>
