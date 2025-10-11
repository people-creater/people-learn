<script setup>
import PageHeader from './components/layout/PageHeader.vue'
</script>

<template>
  <div class="app-page">
    <PageHeader />
    <main class="app-content-wrapper">
      <transition name="slide" mode="out-in">
        <router-view class="app-content" id="appContent"></router-view>
      </transition>
    </main>
  </div>
</template>

<style>
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none; /* 确保渐变层不拦截鼠标事件 */
}
</style>

<style scoped>
.app-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.app-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 60px);
}

/* 向左滑动过渡效果 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: absolute;
  top: 0;
  width: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
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
      // 使用事件委托，监听路由视图中的appContent
      const appContentWrapper = document.querySelector('.app-content-wrapper');

      if (appContentWrapper) {
        let moveTimer;

        const handleMouseMove = (e) => {
          // 清除之前的定时器
          clearTimeout(moveTimer);

          // 查找当前的appContent元素（可能随路由变化而变化）
          const appContent = document.getElementById('appContent');
          if (!appContent) return;

          const rect = appContent.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;

          // 直接设置背景样式而不是使用CSS变量
          this.updateGradientOverlays(appContent, x, y);
          appContent.classList.add('mouse-move');

          // 一段时间后淡出效果
          moveTimer = setTimeout(() => {
            appContent.classList.remove('mouse-move');
          }, 2000);
        };

        const handleMouseLeave = () => {
          const appContent = document.getElementById('appContent');
          if (appContent) {
            appContent.classList.remove('mouse-move');
          }
        };

        appContentWrapper.addEventListener('mousemove', handleMouseMove);
        appContentWrapper.addEventListener('mouseleave', handleMouseLeave);
      }
    },

    updateGradientOverlays(appContent, x, y) {
      // 确保渐变覆盖层存在
      let gradient1 = appContent.querySelector('.gradient-1');
      let gradient2 = appContent.querySelector('.gradient-2');
      let gradient3 = appContent.querySelector('.gradient-3');

      // 如果不存在则创建
      if (!gradient1) {
        gradient1 = document.createElement('div');
        gradient1.className = 'gradient-overlay gradient-1';
        appContent.appendChild(gradient1);
      }

      if (!gradient2) {
        gradient2 = document.createElement('div');
        gradient2.className = 'gradient-overlay gradient-2';
        appContent.appendChild(gradient2);
      }

      if (!gradient3) {
        gradient3 = document.createElement('div');
        gradient3.className = 'gradient-overlay gradient-3';
        appContent.appendChild(gradient3);
      }

      // 更新渐变背景
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

      // 显示渐变层
      gradient1.style.opacity = '1';
      gradient2.style.opacity = '1';
      gradient3.style.opacity = '1';
    }
  }
}
</script>
