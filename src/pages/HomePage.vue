<script setup>
import { useRouter } from "vue-router";
import { subjects } from "@/config.js";

const router = useRouter();

function goTo(link) {
  router.push(link);
}
</script>

<template>
  <div class="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-10">
    <!-- 标题 -->
    <section class="space-y-3 text-center">
      <h1 class="text-4xl font-bold text-neutral-900">松原苏打</h1>
      <h2 class="text-2xl text-neutral-600">まつばら Soda</h2>
      <p class="text-xl text-neutral-500">数学笔记</p>
    </section>

    <!-- 科目列表 -->
    <section class="mx-auto w-10/12 space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-neutral-900">目录</h2>
        <span class="text-sm text-neutral-500">点击即可进入对应笔记</span>
      </div>
      <div class="flex flex-col gap-4">
        <div
          v-for="subject in subjects"
          :key="subject.link"
          :class="[
            'cursor-pointer border border-neutral-200 bg-white px-6 py-5',
            'hover: border-neutral-300 hover:bg-neutral-50',
          ]"
          @click="goTo(subject.link)"
        >
          <h3 class="text-lg font-medium text-neutral-900">
            {{ subject.name }}
          </h3>
        </div>
      </div>
    </section>
  </div>
</template>
