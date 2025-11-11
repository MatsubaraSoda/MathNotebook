<script setup></script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 flex h-16 items-center bg-white px-4 shadow-[inset_0_-1px] shadow-gray-200',
    ]"
  >
    <div :class="['container']">
      <router-link
        to="/"
        :class="['flex items-center gap-3 text-2xl font-bold']"
      >
        <img src="/favicon.svg" alt="Logo" :class="['h-8 w-8']" />
        <span>数学笔记</span>
      </router-link>
    </div>
  </header>
</template>
