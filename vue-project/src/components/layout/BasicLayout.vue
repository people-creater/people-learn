NEW_FILE_CODE
<script setup>
import PageHeader from './PageHeader.vue'
</script>

<template>
  <div class="basic-layout">
    <PageHeader />
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.basic-layout {
  height: 100%;
}

.layout-content {
  height: calc(100% - 60px);
}
</style>
