<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const menuItems = [
  { path: '/', name: 'Index', index: '01' },
  { path: '/about', name: 'Studio', index: '02' },
  { path: '/portfolio', name: 'Work', index: '03' },
  { path: '/blog', name: 'Notes', index: '04' },
  { path: '/contact', name: 'Start', index: '05' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const isActiveRoute = (path) => route.path === path

watch(() => route.path, closeMenu)
</script>

<template>
  <nav class="navigation" aria-label="Primary navigation">
    <div class="nav-container">
      <RouterLink class="logo" data-logo-target to="/" @click="closeMenu">
        <span>People</span>
        <span>Learn</span>
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="primary-menu"
        aria-label="Toggle navigation"
        @click="toggleMenu"
      >
        <span class="hamburger" :class="{ active: isMenuOpen }" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div
        id="primary-menu"
        class="navigation-menu"
        :class="{ open: isMenuOpen }"
      >
        <ul class="menu-list">
          <li
            v-for="item in menuItems"
            :key="item.path"
            class="menu-item"
            :class="{ active: isActiveRoute(item.path) }"
          >
            <RouterLink class="menu-link" :to="item.path">
              <span class="menu-index" aria-hidden="true">{{ item.index }}</span>
              <span class="menu-text">{{ item.name }}</span>
            </RouterLink>
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
  background: rgba(8, 8, 7, 0.58);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(245, 241, 232, 0.12);
}

.nav-container {
  max-width: none;
  margin: 0 auto;
  padding: 0.85rem var(--section-x);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--light);
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--accent-2);
}

.logo span:first-child {
  padding: 0.3rem 0.5rem;
  color: var(--dark);
  background: var(--light);
  border-radius: 999px;
}

.menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  cursor: pointer;
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
  width: 100%;
  height: 3px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
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
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  background: rgba(17, 17, 15, 0.96);
  border-bottom: 1px solid var(--line-invert);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
  transition: max-height 0.3s ease, opacity 0.2s ease;
}

.navigation-menu.open {
  max-height: 420px;
  opacity: 1;
}

.menu-list {
  list-style: none;
  padding: 1rem var(--section-x) 2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.menu-item {
  transition: transform 0.3s ease;
}

.menu-item:hover {
  transform: translateX(6px);
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 42px;
  padding: 0.75rem 1rem;
  color: var(--light);
  border: 1px solid transparent;
  border-radius: 999px;
  transition: background 0.3s ease, color 0.3s ease;
  font-weight: 500;
}

.menu-link:hover,
.menu-item.active .menu-link {
  background: rgba(var(--accent-1-rgb), 0.16);
  border-color: rgba(var(--accent-1-rgb), 0.28);
  color: var(--accent-1);
}

.menu-index {
  width: 2ch;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  opacity: 0.6;
}

.menu-text {
  font-size: 0.88rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .navigation-menu {
    position: static;
    max-height: none;
    opacity: 1;
    overflow: visible;
    background: transparent;
    border: 0;
    box-shadow: none;
  }

  .menu-list {
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 0.35rem;
  }

  .menu-item:hover {
    transform: translateY(-2px);
  }

  .menu-link {
    color: var(--light);
    padding: 0.45rem 0.7rem;
  }
}

@media (max-width: 767px) {
  .nav-container {
    padding: 0.75rem 1rem;
  }

  .logo {
    font-size: 1.25rem;
  }
}
</style>
