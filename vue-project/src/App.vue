<script setup>
import PageHeader from './components/layout/PageHeader.vue'
</script>

<template>
  <div class="app-page">
    <PageHeader />
    <main class="app-content" id="appContent">
      <div class="gradient-overlay" id="gradient1"></div>
      <div class="gradient-overlay" id="gradient2"></div>
      <div class="gradient-overlay" id="gradient3"></div>
      <router-view></router-view>
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
  position: relative;
  overflow: hidden;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.app-content.mouse-move .gradient-overlay {
  opacity: 1;
}

.content-wrapper {
  text-align: center;
  color: white;
  position: relative;
  z-index: 10;
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

<script>
export default {
  mounted() {
    this.initMouseMoveEffect();
  },
  methods: {
    initMouseMoveEffect() {
      const appContent = document.getElementById('appContent');
      const gradient1 = document.getElementById('gradient1');
      const gradient2 = document.getElementById('gradient2');
      const gradient3 = document.getElementById('gradient3');

      if (appContent && gradient1 && gradient2 && gradient3) {
        let moveTimer;

        appContent.addEventListener('mousemove', (e) => {
          // 清除之前的定时器
          clearTimeout(moveTimer);

          const rect = appContent.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;

          // 直接设置背景渐变
          gradient1.style.background = `radial-gradient(
            circle at ${x}% ${y}%,
            rgba(102, 126, 234, 0.4) 0%,
            transparent 30%
          )`;

          gradient2.style.background = `radial-gradient(
            circle at ${x}% ${y}%,
            rgba(118, 75, 162, 0.4) 0%,
            transparent 30%
          )`;

          gradient3.style.background = `radial-gradient(
            circle at ${x}% ${y}%,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 30%
          )`;

          appContent.classList.add('mouse-move');

          // 一段时间后淡出效果
          moveTimer = setTimeout(() => {
            appContent.classList.remove('mouse-move');
          }, 2000);
        });

        appContent.addEventListener('mouseleave', () => {
          appContent.classList.remove('mouse-move');
        });
      }
    }
  }
}
</script>
