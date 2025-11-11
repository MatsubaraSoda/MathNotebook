<script setup>
defineProps({
  items: Array,
  currentLink: String,
});
</script>

<template>
  <aside class="border-neutral-200 py-5">
    <nav>
      <!-- 一级分组 -->
      <div v-for="group in items" :key="group.text" class="space-y-1">
        <div class="px-4 py-2 font-semibold text-neutral-900">
          {{ group.text }}
        </div>

        <!-- 二级项目 -->
        <div v-for="item in group.items" :key="item.text || item.link">
          <!-- 二级：分组（有 items） -->
          <div v-if="item.items" class="space-y-1">
            <div class="px-4 py-1 pl-8 font-semibold text-neutral-900">
              {{ item.text }}
            </div>

            <!-- 三级项目 -->
            <div
              v-for="subItem in item.items"
              :key="subItem.link"
              class="px-4 py-1 pl-12"
            >
              <router-link
                :to="subItem.link"
                class="block text-neutral-900 no-underline hover:underline"
              >
                <span v-if="subItem.link === currentLink" class="mr-1">→</span>
                {{ subItem.text }}
              </router-link>
            </div>
          </div>

          <!-- 二级：叶子节点（有 link） -->
          <div v-else class="px-4 py-1 pl-8">
            <router-link
              :to="item.link"
              class="block text-neutral-900 no-underline hover:underline"
            >
              <span v-if="item.link === currentLink" class="mr-1">→</span>
              {{ item.text }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>
