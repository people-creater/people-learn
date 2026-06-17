<script setup>
import { ref } from 'vue'
import EntryVectorIntro from './Component/EntryVectorIntro.vue'
import Navigation from './Component/Navigation.vue'

const showEntryIntro = ref(true)
</script>

<template>
  <div id="app">
    <EntryVectorIntro
      v-if="showEntryIntro"
      @complete="showEntryIntro = false"
    />
    <Navigation />
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --light: #f5f1e8;
  --light2: #e6efe7;
  --daik: #11110f;
  --dark: #080807;
  --ink: #171612;
  --muted: #7a756b;
  --line: rgba(17, 17, 15, 0.14);
  --line-invert: rgba(245, 241, 232, 0.18);
  --accent-1: #d7ff63;
  --accent-2: #ff6b4a;
  --accent-3: #7aa8ff;
  --accent-1-rgb: 215, 255, 99;
  --radius: 8px;
  --section-x: clamp(1rem, 4vw, 4rem);
}

html {
  scroll-behavior: smooth;
  background: var(--dark);
}

body {
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--light);
  background:
    radial-gradient(circle at 12% 10%, rgba(122, 168, 255, 0.14), transparent 28rem),
    radial-gradient(circle at 82% 8%, rgba(215, 255, 99, 0.12), transparent 24rem),
    var(--dark);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body.entry-intro-active {
  overflow: hidden;
}

body.entry-intro-active .navigation .logo {
  opacity: 0;
}

body.entry-intro-handoff .navigation {
  background: rgba(8, 8, 7, 0.78);
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image:
    linear-gradient(90deg, rgba(245, 241, 232, 0.7) 1px, transparent 1px),
    linear-gradient(rgba(245, 241, 232, 0.7) 1px, transparent 1px);
  background-size: 5px 5px;
  mix-blend-mode: screen;
}

#app {
  width: 100%;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

button {
  border: 0;
  background: none;
  cursor: pointer;
}

input,
textarea {
  border: 0;
  outline: 0;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

::selection {
  color: var(--dark);
  background: var(--accent-1);
}

.container {
  width: min(1200px, calc(100% - var(--section-x) * 2));
  margin: 0 auto;
}

.dark-stage-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 12% 10%, rgba(122, 168, 255, 0.12), transparent 30rem),
    radial-gradient(circle at 86% 8%, rgba(215, 255, 99, 0.1), transparent 28rem),
    var(--dark);
  color: var(--light);
}

.dark-stage-hero {
  position: relative;
  z-index: 3;
}

.page-grid-stage {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.content-panel {
  position: relative;
  z-index: 3;
  background:
    linear-gradient(180deg, rgba(8, 8, 7, 0.6), rgba(8, 8, 7, 0.52)),
    rgba(8, 8, 7, 0.34);
  backdrop-filter: blur(2px);
}

.stage-eyebrow {
  margin-bottom: 1rem;
  color: var(--accent-1);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.stage-title {
  margin: 0;
  color: var(--light);
  font-size: clamp(2.9rem, 7vw, 7.8rem);
  line-height: 0.9;
  font-weight: 680;
  letter-spacing: 0;
}

.stage-copy {
  color: rgba(245, 241, 232, 0.7);
  font-size: clamp(1rem, 1.45vw, 1.18rem);
  line-height: 1.5;
}
</style>
