<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import gsap from 'gsap';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);

const menuItems = [
  { path: '/', name: 'Home', icon: '🏠' },
  { path: '/about', name: 'About', icon: '👤' },
  { path: '/portfolio', name: 'Portfolio', icon: '💼' },
  { path: '/blog', name: 'Blog', icon: '📝' },
  { path: '/contact', name: 'Contact', icon: '📧' }
];

const navigateTo = (path) => {
  if (route.path !== path) {
    router.push(path);
  }
  toggleMenu();
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  const menu = document.querySelector(".navigation-menu");

  if (isMenuOpen.value) {
    // 展开菜单
    gsap.to(menu, {
      duration: 0.5,
      height: 'auto',
      opacity: 1,
      ease: "power2.out",
    });

    // 菜单项动画
    gsap.fromTo(".menu-item",
        {
          y: -20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out"
        }
    );
  } else {
    // 收起菜单
    gsap.to(menu, {
      duration: 0.5,
      height: '0px',
      opacity: 0,
      ease: "power2.in",
    });
  }
};

const isActiveRoute = (path) => {
  return route.path === path;
};
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo" @click="navigateTo('/')">
        <span>Portfolio</span>
      </div>

      <!-- 菜单按钮 -->
      <div class="menu-toggle" @click="toggleMenu">
        <div class="hamburger" :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- 导航菜单 -->
      <div class="navigation-menu" v-show="isMenuOpen">
        <ul class="menu-list">
          <li
              v-for="item in menuItems"
              :key="item.path"
              class="menu-item"
              :class="{ active: isActiveRoute(item.path) }"
              @click="navigateTo(item.path)"
          >
            <a href="javascript:void(0)" class="menu-link">
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-text">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--daik);
  cursor: pointer;
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--accent-1);
}

.menu-toggle {
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  width: 30px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--daik);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.navigation-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--light);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.menu-list {
  list-style: none;
  padding: 2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  transform: translateX(10px);
}

.menu-item.active .menu-link {
  color: var(--accent-1);
  background: rgba(var(--accent-1-rgb), 0.1);
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-decoration: none;
  color: var(--daik);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.menu-link:hover {
  background: rgba(var(--accent-1-rgb), 0.05);
  color: var(--accent-1);
}

.menu-icon {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.menu-text {
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .navigation-menu {
    position: static;
    height: auto !important;
    opacity: 1 !important;
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .menu-list {
    flex-direction: row;
    padding: 0;
    gap: 2rem;
  }

  .menu-item:hover {
    transform: translateY(-2px);
  }

  .menu-link {
    padding: 0.5rem 1rem;
  }

  .menu-toggle {
    display: none;
  }
}

@media (max-width: 767px) {
  .nav-container {
    padding: 1rem;
  }

  .logo {
    font-size: 1.25rem;
  }
}
</style>
