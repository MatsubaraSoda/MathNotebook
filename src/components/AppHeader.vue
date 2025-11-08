<script setup>
</script>

<template>
  <header :class="['bg-white px-4 top-0 z-50 shadow-[inset_0_-1px] shadow-gray-200 sticky h-16 flex items-center']">
    <div :class="['container w-11/12']">
      <router-link to="/" :class="['text-2xl font-bold flex items-center gap-3']">
        <img src="/favicon.svg" alt="Logo" :class="['w-8 h-8']" />
        <span>数学笔记</span>
      </router-link>
    </div>
  </header>
</template>
