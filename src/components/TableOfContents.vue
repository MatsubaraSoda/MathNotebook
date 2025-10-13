<script setup>
defineProps({
  items: Array
})
</script>

<template>
  <aside v-if="items && items.length > 0" class="toc">
    <h3>文章导航</h3>
    <ul>
      <li 
        v-for="item in items" 
        :key="item.id"
        :class="`toc-level-${item.level}`"
      >
        <a :href="`#${item.id}`">{{ item.text }}</a>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.toc {
  position: sticky;
  top: 120px;
  padding-left: 16px;
  border-left: 1px solid #e4e7ed;
}

.toc h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
}

.toc ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc li {
  margin-bottom: 8px;
}

.toc a {
  color: #000;
  text-decoration: none;
}

.toc a:hover {
  text-decoration: underline;
}

/* 不同层级的缩进 */
.toc-level-2 {
  padding-left: 0;
}

.toc-level-3 {
  padding-left: 16px;
}

.toc-level-4 {
  padding-left: 32px;
}
</style>

