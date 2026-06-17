<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import GridParticleBackground from '../Component/GridParticleBackground.vue'
import natureImage from '../assets/nature-1920.jpg'
import lakeImage from '../assets/lake-1920.jpg'
import mountainImage from '../assets/mountain-1920.jpg'
import landscapeImage from '../assets/landscape-1920.jpg'
import { capabilityCards } from '../data/capabilityCards'

const StudioThreeCardUniverse = defineAsyncComponent(() => import('../Component/ThreeCardUniverse.vue'))

const studioRoot = ref(null)
const desktopStageActive = ref(false)
let ctx = null
let stageMedia = null

const syncStageMedia = () => {
  desktopStageActive.value = stageMedia?.matches ?? false
}

const studioCards = capabilityCards.map((card) => ({
  ...card,
  summary: {
    strategy: 'Turn unclear inputs into priorities, product direction, and a motion-ready structure.',
    interface: 'Design responsive screens, reusable UI patterns, and transitions that support reading.',
    delivery: 'Build production Vue interfaces with clean interactions, checked states, and launch rhythm.',
  }[card.id],
}))

const studioThreeCards = studioCards.map((card) => ({
  ...card,
  summary: card.summary,
}))

const mediaTextures = [
  { src: natureImage, alt: 'Nature texture for strategy card', label: 'Research Terrain' },
  { src: lakeImage, alt: 'Lake texture for interface card', label: 'Interface Field' },
  { src: mountainImage, alt: 'Mountain texture for delivery card', label: 'Delivery Ridge' },
  { src: landscapeImage, alt: 'Landscape texture for the studio stage', label: 'Studio Stage' },
]

const methodNotes = studioCards.map((card) => ({
  id: card.id,
  number: card.number,
  title: card.title,
  text: card.summary,
  items: card.items,
  accent: card.accent,
}))

const processSteps = [
  {
    label: 'Signal',
    text: 'Find the story, constraints, and user moments that should shape the interface.',
  },
  {
    label: 'System',
    text: 'Translate the direction into reusable layouts, card rules, motion timing, and responsive states.',
  },
  {
    label: 'Motion',
    text: 'Use GSAP and Three.js only where they clarify the experience instead of adding noise.',
  },
  {
    label: 'Ship',
    text: 'Verify the build, inspect edge cases, and keep the final UI stable across screen sizes.',
  },
]

const toolkitItems = [
  'Vue 3 composition flows',
  'GSAP scoped timelines',
  'ScrollTrigger reveals',
  'Three.js card stages',
  'Responsive fallbacks',
  'Build verification',
]

const outcomes = [
  {
    title: 'Clearer Product Direction',
    text: 'Strategy becomes a visible decision system instead of scattered notes.',
    image: natureImage,
  },
  {
    title: 'Motion With Purpose',
    text: 'Interface states move in a way that supports reading and exploration.',
    image: lakeImage,
  },
  {
    title: 'Launch-Ready Frontend',
    text: 'Delivery focuses on behavior, responsiveness, and clean handoff.',
    image: mountainImage,
  },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const root = studioRoot.value
  if (!root) return

  stageMedia = window.matchMedia('(min-width: 981px)')
  syncStageMedia()
  stageMedia.addEventListener('change', syncStageMedia)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    if (reduceMotion) {
      gsap.set('.studio-reveal', { autoAlpha: 1, y: 0, scale: 1 })
      return
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.studio-eyebrow', { autoAlpha: 0, y: 18, duration: 0.45 }, 0)
      .from('.studio-hero h1', { autoAlpha: 0, y: 44, duration: 0.82 }, 0.08)
      .from('.studio-hero-copy p:not(.studio-eyebrow)', { autoAlpha: 0, y: 24, duration: 0.62, stagger: 0.08 }, 0.22)
      .from('.page-three-stage', { autoAlpha: 0, scale: 1.02, duration: 1.1 }, 0.12)
      .from('.studio-signal', { autoAlpha: 0, y: 20, duration: 0.56, stagger: 0.07 }, 0.32)

    gsap.utils.toArray('.studio-reveal').forEach((block) => {
      gsap.from(block, {
        autoAlpha: 0,
        y: 48,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, root)
})

onUnmounted(() => {
  stageMedia?.removeEventListener('change', syncStageMedia)
  stageMedia = null
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <main ref="studioRoot" class="studio-page dark-stage-page">
    <div class="page-grid-stage" aria-hidden="true">
      <GridParticleBackground variant="studio" :intensity="0.82" />
    </div>

    <div v-if="desktopStageActive" class="page-three-stage desktop-three-stage" aria-hidden="true">
      <StudioThreeCardUniverse
        class="studio-three-universe"
        :cards="studioThreeCards"
        :media-textures="mediaTextures"
        variant="studio"
        quality="full"
        layout="page-stage"
        :intensity="0.86"
        aria-hidden="true"
      />
    </div>

    <section class="studio-hero dark-stage-hero">
      <div class="studio-hero-copy">
        <p class="studio-eyebrow stage-eyebrow">Studio</p>
        <h1 class="stage-title">A capability studio with one spatial method.</h1>
        <p class="stage-copy">
          STUDIO now extends the INDEX stage: the same Strategy, Interface, and Delivery cards
          become a calmer workspace for direction, systems, and launch-ready frontend work.
        </p>

        <div class="studio-signals" aria-label="Studio capability summary">
          <span
            v-for="card in studioCards"
            :key="card.id"
            class="studio-signal"
            :style="{ '--signal-accent': card.accent }"
          >
            {{ card.number }} {{ card.title }}
          </span>
        </div>
      </div>

      <div v-if="!desktopStageActive" class="mobile-three-stage" aria-hidden="true">
        <StudioThreeCardUniverse
          :cards="studioThreeCards"
          :media-textures="mediaTextures"
          variant="studio"
          quality="fallback"
          layout="local-stage"
          :intensity="0.84"
        />
      </div>
    </section>

    <section class="studio-method studio-section content-panel">
      <div class="section-heading studio-reveal">
        <p class="studio-eyebrow stage-eyebrow">Method</p>
        <h2>The INDEX cards become a practical studio method.</h2>
        <p>
          The page no longer repeats a second oversized card show. It translates the same card
          language into a quieter capability grid and lets the 3D stage stay the visual lead.
        </p>
      </div>

      <div class="method-grid">
        <article
          v-for="note in methodNotes"
          :key="note.id"
          class="method-item studio-reveal"
          :style="{ '--method-accent': note.accent }"
        >
          <span>{{ note.number }}</span>
          <h3>{{ note.title }}</h3>
          <p>{{ note.text }}</p>
          <ul>
            <li v-for="item in note.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="process-runway studio-section content-panel">
      <div class="section-heading studio-reveal">
        <p class="studio-eyebrow stage-eyebrow">Process</p>
        <h2>A scroll-friendly path from signal to shipped UI.</h2>
      </div>
      <div class="process-list">
        <article
          v-for="(step, index) in processSteps"
          :key="step.label"
          class="process-step studio-reveal"
        >
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ step.label }}</h3>
          <p>{{ step.text }}</p>
        </article>
      </div>
    </section>

    <section class="toolkit-section studio-section content-panel">
      <div class="section-heading studio-reveal">
        <p class="studio-eyebrow stage-eyebrow">Toolkit</p>
        <h2>Quiet systems for expressive frontend work.</h2>
      </div>
      <div class="toolkit-grid">
        <article
          v-for="item in toolkitItems"
          :key="item"
          class="toolkit-item studio-reveal"
        >
          {{ item }}
        </article>
      </div>
    </section>

    <section class="outcomes-section studio-section content-panel">
      <div class="section-heading studio-reveal">
        <p class="studio-eyebrow stage-eyebrow">Outcomes</p>
        <h2>What the studio system is designed to produce.</h2>
      </div>
      <div class="outcome-grid">
        <article
          v-for="outcome in outcomes"
          :key="outcome.title"
          class="outcome-card studio-reveal"
        >
          <img :src="outcome.image" :alt="outcome.title" />
          <div>
            <h3>{{ outcome.title }}</h3>
            <p>{{ outcome.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="studio-cta content-panel">
      <div class="studio-reveal">
        <p class="studio-eyebrow stage-eyebrow">Next Step</p>
        <h2>Bring the next interface into focus.</h2>
        <div class="cta-actions">
          <RouterLink to="/portfolio">View Work</RouterLink>
          <RouterLink to="/contact">Start a Project</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.studio-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 14% 12%, rgba(122, 168, 255, 0.14), transparent 30rem),
    radial-gradient(circle at 86% 6%, rgba(215, 255, 99, 0.12), transparent 26rem),
    var(--dark);
  color: var(--light);
}

.studio-page::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.16;
  background-image:
    linear-gradient(90deg, rgba(245, 241, 232, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(245, 241, 232, 0.06) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(180deg, #000, transparent 70%);
}

.studio-hero,
.studio-section,
.studio-cta {
  position: relative;
  z-index: 2;
}

.page-three-stage {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.mobile-three-stage {
  display: none;
}

.studio-hero {
  display: grid;
  grid-template-columns: minmax(24rem, 0.68fr) minmax(36rem, 1.32fr);
  align-items: center;
  min-height: 100svh;
  gap: clamp(2rem, 5vw, 5.5rem);
  padding: 7rem var(--section-x) 3rem;
}

.studio-hero-copy {
  max-width: 46rem;
}

.studio-eyebrow {
  margin-bottom: 1rem;
  color: var(--accent-1);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.studio-hero h1,
.section-heading h2,
.studio-cta h2 {
  max-width: 62rem;
  margin: 0;
  color: var(--light);
  font-size: clamp(2.6rem, 4.7vw, 4.8rem);
  line-height: 0.96;
  font-weight: 650;
  letter-spacing: 0;
}

.studio-hero-copy p:not(.studio-eyebrow),
.section-heading p:not(.studio-eyebrow),
.method-item p,
.process-step p,
.outcome-card p {
  color: rgba(245, 241, 232, 0.68);
}

.studio-hero-copy p:not(.studio-eyebrow) {
  max-width: 38rem;
  margin-top: 1.35rem;
  font-size: clamp(1rem, 1.45vw, 1.18rem);
}

.studio-signals {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.75rem;
}

.studio-signal {
  display: inline-flex;
  align-items: center;
  min-height: 2.2rem;
  padding: 0 0.75rem;
  border: 1px solid color-mix(in srgb, var(--signal-accent), transparent 68%);
  border-radius: 999px;
  color: var(--signal-accent);
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.studio-three-universe {
  min-height: 100%;
}

.studio-section {
  padding: 7rem var(--section-x);
}

.content-panel {
  background:
    linear-gradient(180deg, rgba(8, 8, 7, 0.6), rgba(8, 8, 7, 0.52)),
    rgba(8, 8, 7, 0.32);
  backdrop-filter: blur(2px);
}

.section-heading {
  max-width: 64rem;
  margin-bottom: clamp(2.5rem, 5vw, 5rem);
}

.section-heading h2,
.studio-cta h2 {
  font-size: clamp(2.4rem, 5.6vw, 5.5rem);
}

.section-heading p:not(.studio-eyebrow) {
  max-width: 44rem;
  margin-top: 1rem;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid rgba(245, 241, 232, 0.12);
  background: rgba(245, 241, 232, 0.12);
}

.method-item {
  min-height: 24rem;
  padding: 1.15rem;
  background: #10100e;
}

.method-item > span {
  color: var(--method-accent);
  font-size: 0.82rem;
  font-weight: 850;
}

.method-item h3 {
  margin: 4.5rem 0 1rem;
  color: var(--light);
  font-size: clamp(1.8rem, 3.5vw, 3.4rem);
  line-height: 1;
}

.method-item p {
  margin: 0 0 1.2rem;
}

.method-item ul {
  display: grid;
  gap: 0.45rem;
  list-style: none;
}

.method-item li {
  padding: 0.55rem 0.65rem;
  border: 1px solid rgba(245, 241, 232, 0.12);
  border-radius: 4px;
  background: rgba(245, 241, 232, 0.055);
  color: rgba(245, 241, 232, 0.76);
  font-size: 0.8rem;
  font-weight: 760;
}

.process-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(245, 241, 232, 0.13);
  border-left: 1px solid rgba(245, 241, 232, 0.13);
}

.process-step {
  min-height: 18rem;
  padding: 1.15rem;
  border-right: 1px solid rgba(245, 241, 232, 0.13);
  border-bottom: 1px solid rgba(245, 241, 232, 0.13);
}

.process-step span {
  color: var(--accent-1);
  font-size: 0.78rem;
  font-weight: 850;
}

.process-step h3 {
  margin: 4rem 0 1rem;
  color: var(--light);
  font-size: clamp(1.5rem, 3vw, 2.4rem);
}

.toolkit-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid rgba(245, 241, 232, 0.12);
  background: rgba(245, 241, 232, 0.12);
}

.toolkit-item {
  min-height: 9rem;
  padding: 1.15rem;
  background: #0c0c0a;
  color: var(--light);
  font-size: clamp(1.05rem, 2vw, 1.55rem);
  font-weight: 760;
}

.outcome-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.outcome-card {
  overflow: hidden;
  border: 1px solid rgba(245, 241, 232, 0.12);
  border-radius: var(--radius);
  background: rgba(245, 241, 232, 0.04);
}

.outcome-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  object-fit: cover;
  filter: saturate(0.82) contrast(1.05);
}

.outcome-card div {
  padding: 1rem;
}

.outcome-card h3 {
  margin: 0 0 0.75rem;
  color: var(--light);
  font-size: 1.28rem;
}

.studio-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 82svh;
  padding: 7rem var(--section-x);
  text-align: center;
}

.studio-cta > div {
  max-width: 68rem;
}

.studio-cta .studio-eyebrow,
.studio-cta h2 {
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.cta-actions a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid rgba(245, 241, 232, 0.18);
  border-radius: 999px;
  color: var(--light);
  font-weight: 850;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
}

.cta-actions a:hover {
  transform: translateY(-2px);
  background: var(--accent-1);
  color: var(--dark);
}

@media (max-width: 980px) {
  .studio-hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 7rem;
  }

  .desktop-three-stage {
    display: none;
  }

  .mobile-three-stage {
    display: block;
    width: min(100%, 34rem);
    margin: 0 auto;
  }

  .method-grid,
  .process-list,
  .toolkit-grid,
  .outcome-grid {
    grid-template-columns: 1fr;
  }

  .process-step {
    min-height: 13rem;
  }
}

@media (max-width: 640px) {
  .studio-hero,
  .studio-section,
  .studio-cta {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .studio-hero h1 {
    font-size: clamp(2.6rem, 15vw, 4.4rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-three-stage,
  .studio-reveal {
    will-change: auto;
  }
}
</style>
