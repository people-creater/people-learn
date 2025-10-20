<script setup>
import Navigation from './Component/Navigation.vue';
</script>

<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --light: #ffffff;
  --light2: #f8f9fa;
  --daik: #1a1a1a;
  --accent-1: #6366f1;
  --accent-2: #8b5cf6;
  --accent-3: #ec4899;
  --accent-1-rgb: 99, 102, 241;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: var(--daik);
  background: var(--light);
}

#app {
  min-height: 100vh;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 链接样式 */
a {
  color: inherit;
  text-decoration: none;
}

/* 按钮样式 */
button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

/* 输入框样式 */
input, textarea {
  font-family: inherit;
  border: none;
  outline: none;
}

/* 图片样式 */
img {
  max-width: 100%;
  height: auto;
}

/* 工具类 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.text-center {
  text-align: center;
}

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

/* 响应式工具类 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>
