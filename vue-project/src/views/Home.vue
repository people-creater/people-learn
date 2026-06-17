<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import GridParticleBackground from '../Component/GridParticleBackground.vue'
import natureImage from '../assets/nature-1920.jpg'
import lakeImage from '../assets/lake-1920.jpg'
import mountainImage from '../assets/mountain-1920.jpg'
import landscapeImage from '../assets/landscape-1920.jpg'
import { capabilityCards } from '../data/capabilityCards'

const ThreeCardUniverse = defineAsyncComponent(() => import('../Component/ThreeCardUniverse.vue'))

const mediaTextures = [
  { src: natureImage, alt: 'Nature texture for strategy card', label: 'Research Terrain' },
  { src: lakeImage, alt: 'Lake texture for interface card', label: 'Interface Field' },
  { src: mountainImage, alt: 'Mountain texture for delivery card', label: 'Delivery Ridge' },
  { src: landscapeImage, alt: 'Landscape texture for the dark stage', label: 'People Learn Stage' },
]

const stageMetrics = capabilityCards.map((card) => ({
  number: card.number,
  title: card.title,
  text: card.items.join(' / '),
  accent: card.accent,
}))

const capabilityNotes = [
  {
    label: 'Signal',
    text: 'Research frames the field before layout, motion, or code starts competing for attention.',
  },
  {
    label: 'System',
    text: 'Interface rules turn the card language into repeatable spacing, rhythm, and transitions.',
  },
  {
    label: 'Motion',
    text: 'Motion gives the system presence without turning the interface into decoration.',
  },
  {
    label: 'Delivery',
    text: 'Delivery keeps the final experience stable, responsive, and ready to inspect in the browser.',
  },
]

const homeRoot = ref(null)
const desktopStageActive = ref(false)
let lenis = null
let ctx = null
let backgroundCleanup = null
let stageMedia = null

const syncStageMedia = () => {
  desktopStageActive.value = stageMedia?.matches ?? false
}

const tickLenis = (time) => {
  lenis?.raf(time * 1000)
}

const setupPointerBackground = () => {
  const root = homeRoot.value
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!root || reduceMotion) return null

  const xTo = gsap.quickTo(root, '--bg-x', { duration: 0.7, ease: 'power3.out' })
  const yTo = gsap.quickTo(root, '--bg-y', { duration: 0.7, ease: 'power3.out' })
  const limeTo = gsap.quickTo(root, '--bg-lime', { duration: 0.55, ease: 'sine.out' })
  const warmTo = gsap.quickTo(root, '--bg-warm', { duration: 0.55, ease: 'sine.out' })
  const coolTo = gsap.quickTo(root, '--bg-cool', { duration: 0.55, ease: 'sine.out' })

  const handlePointerMove = (event) => {
    const rect = root.getBoundingClientRect()
    const x = gsap.utils.clamp(0, 100, ((event.clientX - rect.left) / rect.width) * 100)
    const y = gsap.utils.clamp(0, 100, ((event.clientY - rect.top) / rect.height) * 100)
    const center = 1 - Math.min(1, Math.hypot(x - 50, y - 44) / 64)

    xTo(x)
    yTo(y)
    limeTo(0.12 + center * 0.11)
    warmTo(0.08 + (x / 100) * 0.08)
    coolTo(0.09 + ((100 - x) / 100) * 0.1)
  }

  const handlePointerLeave = () => {
    xTo(50)
    yTo(20)
    limeTo(0.14)
    warmTo(0.08)
    coolTo(0.1)
  }

  root.addEventListener('pointermove', handlePointerMove)
  root.addEventListener('pointerleave', handlePointerLeave)

  return () => {
    root.removeEventListener('pointermove', handlePointerMove)
    root.removeEventListener('pointerleave', handlePointerLeave)
    handlePointerLeave()
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const root = homeRoot.value
  if (!root) return

  stageMedia = window.matchMedia('(min-width: 981px)')
  syncStageMedia()
  stageMedia.addEventListener('change', syncStageMedia)

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tickLenis)
  gsap.ticker.lagSmoothing(0)
  backgroundCleanup = setupPointerBackground()

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    if (reduceMotion) {
      gsap.set('.home-reveal', { autoAlpha: 1, y: 0 })
      return
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-copy', { autoAlpha: 0, y: 32, duration: 0.75 }, 0)
      .from('.page-three-stage', { autoAlpha: 0, scale: 1.02, duration: 1.1 }, 0.08)
      .from('.stage-metric', { autoAlpha: 0, y: 20, duration: 0.55, stagger: 0.08 }, 0.28)

    gsap.utils.toArray('.home-reveal').forEach((block) => {
      gsap.from(block, {
        autoAlpha: 0,
        y: 42,
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
  gsap.ticker.remove(tickLenis)
  lenis?.destroy()
  lenis = null
  backgroundCleanup?.()
  backgroundCleanup = null
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <main ref="homeRoot" class="home-page dark-stage-page">
    <div class="page-grid-stage" aria-hidden="true">
      <GridParticleBackground variant="home" :intensity="0.86" />
    </div>

    <div v-if="desktopStageActive" class="page-three-stage desktop-three-stage" aria-hidden="true">
      <ThreeCardUniverse
        class="home-three-universe"
        :cards="capabilityCards"
        :media-textures="mediaTextures"
        variant="hero"
        quality="full"
        layout="page-stage"
        :intensity="0.92"
        aria-hidden="true"
      />
    </div>

    <section class="hero dark-stage-hero">
      <div class="hero-copy">
        <p class="eyebrow stage-eyebrow">People Learn Studio</p>
        <h1 class="stage-title">Signal systems for learning interfaces.</h1>
        <p class="hero-intro stage-copy">
          Strategy, interface, motion, and delivery move as one spatial system across the dark stage.
        </p>
      </div>

      <div v-if="!desktopStageActive" class="mobile-three-stage" aria-hidden="true">
        <ThreeCardUniverse
          :cards="capabilityCards"
          :media-textures="mediaTextures"
          variant="hero"
          quality="fallback"
          layout="local-stage"
          :intensity="0.9"
        />
      </div>

      <div class="stage-metrics" aria-label="Capability summary">
        <article
          v-for="metric in stageMetrics"
          :key="metric.title"
          class="stage-metric"
          :style="{ '--metric-accent': metric.accent }"
        >
          <span>{{ metric.number }}</span>
          <strong>{{ metric.title }}</strong>
          <p>{{ metric.text }}</p>
        </article>
      </div>
    </section>

    <section class="capability-runway home-section content-panel">
      <div class="section-heading home-reveal">
        <p class="eyebrow stage-eyebrow">System</p>
        <h2>The card language stays consistent after the first scroll.</h2>
      </div>

      <div class="capability-list">
        <article
          v-for="card in capabilityCards"
          :key="card.id"
          class="capability-row home-reveal"
          :style="{ '--row-accent': card.accent }"
        >
          <span class="capability-row__number">{{ card.number }}</span>
          <div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.summary }}</p>
          </div>
          <ul>
            <li v-for="item in card.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="home-notes home-section content-panel">
      <div class="section-heading home-reveal">
        <p class="eyebrow stage-eyebrow">Motion</p>
        <h2>A quieter continuation for the 3D-first stage.</h2>
      </div>

      <div class="note-grid">
        <article
          v-for="note in capabilityNotes"
          :key="note.label"
          class="note-item home-reveal"
        >
          <span>{{ note.label }}</span>
          <p>{{ note.text }}</p>
        </article>
      </div>
    </section>

    <section class="home-outro content-panel">
      <div class="home-reveal">
        <p class="eyebrow stage-eyebrow">Delivery</p>
        <h2>Vue, GSAP, and Three.js working from the same visual system.</h2>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  --bg-x: 50;
  --bg-y: 20;
  --bg-lime: 0.14;
  --bg-warm: 0.08;
  --bg-cool: 0.1;
  position: relative;
  overflow-x: hidden;
  isolation: isolate;
  background:
    radial-gradient(
      circle at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
      rgba(var(--accent-1-rgb), var(--bg-lime)),
      transparent min(30rem, 58vw)
    ),
    radial-gradient(
      circle at calc((100 - var(--bg-x)) * 1%) calc((var(--bg-y) + 22) * 1%),
      rgba(255, 107, 74, var(--bg-warm)),
      transparent min(28rem, 54vw)
    ),
    radial-gradient(
      circle at calc((var(--bg-x) + 12) * 1%) calc((100 - var(--bg-y)) * 1%),
      rgba(122, 168, 255, var(--bg-cool)),
      transparent min(30rem, 60vw)
    ),
    var(--dark);
  color: var(--light);
}

.home-page::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image:
    linear-gradient(90deg, rgba(245, 241, 232, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(245, 241, 232, 0.06) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(180deg, #000, transparent 74%);
}

.hero,
.home-section,
.home-outro {
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
  grid-area: mobile-stage;
}

.hero {
  display: grid;
  grid-template-columns: minmax(24rem, 0.72fr) minmax(36rem, 1.28fr);
  grid-template-areas:
    "copy ."
    "metrics .";
  align-items: center;
  min-height: 100svh;
  gap: clamp(2rem, 4.5vw, 5rem);
  padding: 7rem var(--section-x) 3rem;
}

.hero-copy {
  grid-area: copy;
  max-width: 43rem;
}

.eyebrow {
  margin-bottom: 1rem;
  color: var(--accent-1);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero h1,
.section-heading h2,
.home-outro h2 {
  margin: 0;
  color: var(--light);
  font-size: clamp(2.6rem, 4.8vw, 4.9rem);
  line-height: 0.96;
  font-weight: 650;
  letter-spacing: 0;
}

.hero-intro,
.section-heading p:not(.eyebrow),
.capability-row p,
.note-item p {
  color: rgba(245, 241, 232, 0.7);
}

.hero-intro {
  max-width: 36rem;
  margin-top: 1.35rem;
  font-size: clamp(1rem, 1.4vw, 1.18rem);
}

.home-three-universe {
  min-height: 100%;
}

.stage-metrics {
  grid-area: metrics;
  display: grid;
  gap: 0.75rem;
}

.stage-metric {
  display: grid;
  grid-template-columns: 3.2rem minmax(0, 1fr);
  gap: 0.25rem 1rem;
  padding: 0.9rem 0;
  border-top: 1px solid rgba(245, 241, 232, 0.12);
}

.stage-metric span {
  grid-row: span 2;
  color: var(--metric-accent);
  font-size: 0.82rem;
  font-weight: 850;
}

.stage-metric strong {
  color: var(--light);
  font-size: 1.04rem;
}

.stage-metric p {
  margin: 0;
  color: rgba(245, 241, 232, 0.56);
  font-size: 0.86rem;
}

.home-section {
  padding: 7rem var(--section-x);
}

.content-panel {
  background:
    linear-gradient(180deg, rgba(8, 8, 7, 0.58), rgba(8, 8, 7, 0.5)),
    rgba(8, 8, 7, 0.3);
  backdrop-filter: blur(2px);
}

.section-heading {
  max-width: 64rem;
  margin-bottom: clamp(2.5rem, 5vw, 5rem);
}

.section-heading h2,
.home-outro h2 {
  font-size: clamp(2.4rem, 5.6vw, 5.5rem);
}

.section-heading p:not(.eyebrow) {
  max-width: 42rem;
  margin-top: 1rem;
}

.capability-list {
  border-top: 1px solid rgba(245, 241, 232, 0.14);
}

.capability-row {
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr) minmax(13rem, 0.44fr);
  gap: clamp(1rem, 4vw, 4rem);
  align-items: start;
  padding: clamp(1.25rem, 3vw, 2rem) 0;
  border-bottom: 1px solid rgba(245, 241, 232, 0.14);
}

.capability-row__number {
  color: var(--row-accent);
  font-size: 0.82rem;
  font-weight: 850;
}

.capability-row h3 {
  margin: 0 0 0.75rem;
  color: var(--light);
  font-size: clamp(1.9rem, 4.5vw, 4rem);
  line-height: 1;
}

.capability-row p {
  max-width: 45rem;
  margin: 0;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
}

.capability-row ul {
  display: grid;
  gap: 0.45rem;
  list-style: none;
}

.capability-row li {
  padding: 0.58rem 0.7rem;
  border: 1px solid rgba(245, 241, 232, 0.12);
  border-radius: 4px;
  background: rgba(245, 241, 232, 0.055);
  color: rgba(245, 241, 232, 0.76);
  font-size: 0.82rem;
  font-weight: 760;
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid rgba(245, 241, 232, 0.12);
  background: rgba(245, 241, 232, 0.12);
}

.note-item {
  min-height: 15rem;
  padding: 1.1rem;
  background: #10100e;
}

.note-item span {
  color: var(--accent-1);
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.note-item p {
  margin: 5rem 0 0;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
}

.home-outro {
  display: flex;
  min-height: 86svh;
  align-items: center;
  justify-content: center;
  padding: 7rem var(--section-x);
  text-align: center;
}

.home-outro > div {
  max-width: 68rem;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-areas:
      "copy"
      "mobile-stage"
      "metrics";
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

  .capability-row,
  .note-grid {
    grid-template-columns: 1fr;
  }

  .capability-row {
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .hero,
  .home-section,
  .home-outro {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero h1 {
    font-size: clamp(2.6rem, 15vw, 4.4rem);
  }

  .stage-metric {
    grid-template-columns: 2.6rem minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-three-stage,
  .home-reveal {
    will-change: auto;
  }
}
</style>
