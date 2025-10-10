NEW_FILE_CODE
<script setup>
import PageHeader from './components/layout/PageHeader.vue'
</script>

<template>
  <div class="app-page">
    <PageHeader />
    <main class="app-content">
      <div class="content-wrapper">
        <h1>应用主页</h1>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  text-align: center;
  color: white;
}

.content-wrapper h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.content-wrapper p {
  font-size: 1.2rem;
  opacity: 0.9;
}
</style>
