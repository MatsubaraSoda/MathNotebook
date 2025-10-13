<script setup>
import { subjects } from '@/config.js'

function goTo(link) {
  window.location.href = `/article.html?link=${link}`
}
</script>

<template>
  <div class="home-page">
    <!-- 标题 -->
    <section class="hero">
      <h1>松原苏打</h1>
      <h2>まつばら Soda</h2>
      <p>数学笔记</p>
    </section>

    <!-- 科目列表 -->
    <section class="subjects-section">
      <div class="container">
        <h2>科目</h2>
        
        <div class="subjects-list">
          <div 
            v-for="subject in subjects" 
            :key="subject.link"
            class="subject-item"
            @click="goTo(subject.link)"
          >
            <h3>{{ subject.name }}</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 60px 20px;
}

.hero h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.hero h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.hero p {
  color: #666;
}

.subjects-section {
  padding: 0;
}

.subjects-section h2 {
  text-align: center;
  margin-bottom: 30px;
}

.subjects-list {
  max-width: 800px;
  margin: 0 auto;
}

.subject-item {
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid #e4e7ed;
  cursor: pointer;
}

.subject-item:hover {
  background: #f5f7fa;
}

.subject-item h3 {
  margin: 0;
  font-size: 18px;
}
</style>
