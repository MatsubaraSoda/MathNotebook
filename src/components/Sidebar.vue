<script setup>
defineProps({
  items: Array,
  currentLink: String
})
</script>

<template>
  <aside class="sidebar">
    <nav>
      <!-- 一级分组 -->
      <div v-for="group in items" :key="group.text" class="group-1">
        <div class="group-title-1">{{ group.text }}</div>

        <!-- 二级项目 -->
        <div v-for="item in group.items" :key="item.text || item.link">
          <!-- 二级：分组（有 items） -->
          <div v-if="item.items" class="group-2">
            <div class="group-title-2">{{ item.text }}</div>

            <!-- 三级项目 -->
            <div
              v-for="subItem in item.items"
              :key="subItem.link"
              class="item-level-3"
              :class="{ active: subItem.link === currentLink }"
            >
              <a :href="`/article.html?link=${subItem.link}`">{{ subItem.text }}</a>
            </div>
          </div>

          <!-- 二级：叶子节点（有 link） -->
          <div
            v-else
            class="item-level-2"
            :class="{ active: item.link === currentLink }"
          >
            <a :href="`/article.html?link=${item.link}`">{{ item.text }}</a>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  border-right: 1px solid #e4e7ed;
  padding: 20px 0;
}

.group-title-1,
.group-title-2 {
  font-weight: 600;
  color: #000;
  padding: 8px 16px;
}

.group-title-2 {
  padding-left: 32px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.item-level-2,
.item-level-3 {
  padding: 4px 16px;
}

.item-level-2 {
  padding-left: 32px;
}

.item-level-3 {
  padding-left: 48px;
}

.sidebar a {
  display: block;
  color: #000;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.sidebar .active a::before {
  content: '→ ';
}
</style>
