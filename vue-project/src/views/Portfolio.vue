<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GridParticleBackground from '../Component/GridParticleBackground.vue'
import natureImage from '../assets/nature-1920.jpg'
import lakeImage from '../assets/lake-1920.jpg'
import mountainImage from '../assets/mountain-1920.jpg'
import landscapeImage from '../assets/landscape-1920.jpg'

const workRoot = ref(null)
let ctx = null

const projects = [
  {
    id: '01',
    title: 'Signal Field',
    chapter: 'Selected Work',
    category: 'Web System',
    year: '2026',
    image: natureImage,
    summary: 'A cinematic landing system with scroll rhythm, grid atmosphere, and modular narrative sections.',
    proof: ['Dark stage', 'GSAP rhythm', 'Responsive checks'],
  },
  {
    id: '02',
    title: 'Quiet Banking',
    chapter: 'Systems',
    category: 'Product UI',
    year: '2025',
    image: lakeImage,
    summary: 'A calm operational interface shaped around comparison, trust, and fast repeated decisions.',
    proof: ['Dense layouts', 'Readable states', 'Motion restraint'],
  },
  {
    id: '03',
    title: 'North Brand',
    chapter: 'Proof',
    category: 'Identity',
    year: '2025',
    image: mountainImage,
    summary: 'A sharp editorial brand direction that translates typography and imagery into a usable web system.',
    proof: ['Type scale', 'Art direction', 'Interaction rules'],
  },
  {
    id: '04',
    title: 'Commerce Atlas',
    chapter: 'Detail',
    category: 'Frontend',
    year: '2024',
    image: landscapeImage,
    summary: 'A storefront prototype that turns product browsing into a slower, more spatial inspection flow.',
    proof: ['Vue build', 'Performance pass', 'Launch flow'],
  },
]

const categories = ['All', 'Web System', 'Product UI', 'Identity', 'Frontend']
const activeFilter = ref('All')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects
  return projects.filter((project) => project.category === activeFilter.value)
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const root = workRoot.value
  if (!root) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = gsap.context(() => {
    if (reduceMotion) {
      gsap.set('.work-reveal', { autoAlpha: 1, y: 0 })
      return
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.work-hero-copy', { autoAlpha: 0, y: 36, duration: 0.78 }, 0)
      .from('.work-filter', { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.06 }, 0.28)

    gsap.utils.toArray('.work-reveal').forEach((block) => {
      gsap.from(block, {
        autoAlpha: 0,
        y: 46,
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
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <main ref="workRoot" class="work-page dark-stage-page">
    <div class="page-grid-stage" aria-hidden="true">
      <GridParticleBackground variant="work" :intensity="0.78" />
    </div>

    <section class="work-hero dark-stage-hero">
      <div class="work-hero-copy">
        <p class="stage-eyebrow">Work</p>
        <h1 class="stage-title">Selected Work built as systems, proof, and detail.</h1>
        <p class="stage-copy">
          Project rows stay quiet and inspectable while the background keeps the same spatial language as INDEX and STUDIO.
        </p>
      </div>
    </section>

    <section class="work-filters content-panel" aria-label="Work filters">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="work-filter"
        :class="{ active: activeFilter === category }"
        @click="activeFilter = category"
      >
        {{ category }}
      </button>
    </section>

    <section class="work-index content-panel">
      <article
        v-for="project in filteredProjects"
        :key="project.id"
        class="work-row work-reveal"
      >
        <div class="work-number">{{ project.id }}</div>
        <div class="work-image">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="work-copy">
          <div class="work-meta">
            <span>{{ project.chapter }}</span>
            <span>{{ project.category }} / {{ project.year }}</span>
          </div>
          <h2>{{ project.title }}</h2>
          <p>{{ project.summary }}</p>
          <div class="work-proof" aria-label="Project proof points">
            <span v-for="item in project.proof" :key="item">{{ item }}</span>
          </div>
        </div>
      </article>
    </section>

    <section class="work-cta content-panel">
      <p class="stage-eyebrow">Next Step</p>
      <h2>Move from reference to a working interface.</h2>
      <RouterLink to="/contact">Start a Brief</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.work-hero {
  display: flex;
  min-height: 92svh;
  align-items: flex-end;
  padding: 8rem var(--section-x) 4rem;
}

.work-hero-copy {
  max-width: 82rem;
}

.work-hero .stage-copy {
  max-width: 42rem;
  margin-top: 1.4rem;
}

.work-filters {
  position: sticky;
  top: 69px;
  z-index: 30;
  display: flex;
  gap: 0.5rem;
  padding: 0.95rem var(--section-x);
  overflow-x: auto;
  border-top: 1px solid rgba(245, 241, 232, 0.12);
  border-bottom: 1px solid rgba(245, 241, 232, 0.12);
}

.work-filter {
  flex: 0 0 auto;
  min-height: 38px;
  padding: 0 0.9rem;
  border: 1px solid rgba(245, 241, 232, 0.14);
  border-radius: 999px;
  color: rgba(245, 241, 232, 0.72);
  background: rgba(245, 241, 232, 0.04);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.work-filter:hover,
.work-filter.active {
  color: var(--accent-1);
  border-color: rgba(var(--accent-1-rgb), 0.42);
  transform: translateY(-2px);
}

.work-index {
  padding: 0 var(--section-x) 5rem;
}

.work-row {
  display: grid;
  grid-template-columns: 4rem minmax(18rem, 0.88fr) minmax(20rem, 1.12fr);
  gap: clamp(1rem, 3vw, 3rem);
  align-items: center;
  min-height: 64svh;
  padding: clamp(2rem, 5vw, 5rem) 0;
  border-bottom: 1px solid rgba(245, 241, 232, 0.14);
}

.work-number,
.work-meta {
  color: rgba(245, 241, 232, 0.52);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.work-number {
  align-self: start;
  color: var(--accent-1);
}

.work-image {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 1px solid rgba(245, 241, 232, 0.12);
  border-radius: 8px;
  background: #10100e;
}

.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.78) contrast(1.05) brightness(0.68);
  transition: transform 0.8s ease, filter 0.8s ease;
}

.work-row:hover .work-image img {
  transform: scale(1.06);
  filter: saturate(1.02) contrast(1.08) brightness(0.78);
}

.work-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.work-copy h2,
.work-cta h2 {
  margin: 0;
  color: var(--light);
  font-size: clamp(2.25rem, 5.4vw, 5.6rem);
  line-height: 0.9;
  font-weight: 680;
}

.work-copy p {
  max-width: 42rem;
  margin: 1.1rem 0 1.4rem;
  color: rgba(245, 241, 232, 0.68);
  font-size: clamp(1rem, 1.35vw, 1.12rem);
}

.work-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.work-proof span {
  padding: 0.45rem 0.65rem;
  border: 1px solid rgba(245, 241, 232, 0.13);
  border-radius: 999px;
  color: rgba(245, 241, 232, 0.72);
  font-size: 0.75rem;
  font-weight: 800;
}

.work-cta {
  display: flex;
  min-height: 76svh;
  flex-direction: column;
  justify-content: center;
  padding: 7rem var(--section-x);
}

.work-cta h2 {
  max-width: 74rem;
}

.work-cta a {
  width: fit-content;
  margin-top: 2rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid rgba(var(--accent-1-rgb), 0.4);
  border-radius: 999px;
  color: var(--accent-1);
  font-weight: 850;
}

@media (max-width: 900px) {
  .work-row {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .work-hero,
  .work-index,
  .work-cta {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
