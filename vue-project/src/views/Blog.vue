<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GridParticleBackground from '../Component/GridParticleBackground.vue'

const notesRoot = ref(null)
let ctx = null

const notes = [
  {
    id: '01',
    chapter: 'Thinking',
    title: 'Design starts when the signal becomes visible.',
    category: 'Strategy',
    date: '2026.02',
    readTime: '4 min',
    summary: 'A note on turning unclear inputs into structure before pixels and motion start competing.',
    tags: ['Research', 'Direction'],
  },
  {
    id: '02',
    chapter: 'Motion',
    title: 'The interface should move only when movement explains state.',
    category: 'Motion',
    date: '2026.01',
    readTime: '5 min',
    summary: 'How scroll rhythm, cursor feedback, and reveal timing can support reading instead of decoration.',
    tags: ['GSAP', 'Scroll'],
  },
  {
    id: '03',
    chapter: 'Interface',
    title: 'Systems make rich pages feel calm.',
    category: 'Interface',
    date: '2025.12',
    readTime: '6 min',
    summary: 'A practical view of spacing, type, cards, and repeated states inside expressive product pages.',
    tags: ['Layout', 'Systems'],
  },
  {
    id: '04',
    chapter: 'Delivery',
    title: 'A launch check is part of the design.',
    category: 'Delivery',
    date: '2025.11',
    readTime: '3 min',
    summary: 'Browser verification, mobile fallbacks, and cleanup rules keep the final experience dependable.',
    tags: ['Vue', 'Verification'],
  },
]

const categories = ['All', 'Strategy', 'Motion', 'Interface', 'Delivery']
const activeCategory = ref('All')

const filteredNotes = computed(() => {
  if (activeCategory.value === 'All') return notes
  return notes.filter((note) => note.category === activeCategory.value)
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const root = notesRoot.value
  if (!root) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = gsap.context(() => {
    if (reduceMotion) {
      gsap.set('.note-reveal', { autoAlpha: 1, y: 0 })
      return
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.notes-hero-copy', { autoAlpha: 0, y: 36, duration: 0.78 }, 0)
      .from('.notes-filter', { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.06 }, 0.24)

    gsap.utils.toArray('.note-reveal').forEach((block) => {
      gsap.from(block, {
        autoAlpha: 0,
        y: 42,
        duration: 0.68,
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
  <main ref="notesRoot" class="notes-page dark-stage-page">
    <div class="page-grid-stage" aria-hidden="true">
      <GridParticleBackground variant="notes" :intensity="0.76" />
    </div>

    <section class="notes-hero dark-stage-hero">
      <div class="notes-hero-copy">
        <p class="stage-eyebrow">Notes</p>
        <h1 class="stage-title">Thinking, motion, interface, delivery.</h1>
        <p class="stage-copy">
          Short editorial notes on the decisions behind spatial web interfaces and production-ready interaction systems.
        </p>
      </div>
    </section>

    <section class="notes-filters content-panel" aria-label="Notes filters">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="notes-filter"
        :class="{ active: activeCategory === category }"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </section>

    <section class="notes-index content-panel">
      <article
        v-for="note in filteredNotes"
        :key="note.id"
        class="note-row note-reveal"
      >
        <span class="note-number">{{ note.id }}</span>
        <div class="note-main">
          <div class="note-meta">
            <span>{{ note.chapter }}</span>
            <span>{{ note.date }} / {{ note.readTime }}</span>
          </div>
          <h2>{{ note.title }}</h2>
          <p>{{ note.summary }}</p>
        </div>
        <div class="note-tags">
          <span v-for="tag in note.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </section>

    <section class="notes-cta content-panel">
      <p class="stage-eyebrow">Next Step</p>
      <h2>Turn the next note into a working interface.</h2>
      <RouterLink to="/contact">Start a Brief</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.notes-hero {
  display: flex;
  min-height: 90svh;
  align-items: flex-end;
  padding: 8rem var(--section-x) 4rem;
}

.notes-hero-copy {
  max-width: 82rem;
}

.notes-hero .stage-copy {
  max-width: 42rem;
  margin-top: 1.4rem;
}

.notes-filters {
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

.notes-filter {
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

.notes-filter:hover,
.notes-filter.active {
  color: var(--accent-1);
  border-color: rgba(var(--accent-1-rgb), 0.42);
  transform: translateY(-2px);
}

.notes-index {
  padding: 0 var(--section-x) 5rem;
}

.note-row {
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr) minmax(10rem, 0.24fr);
  gap: clamp(1rem, 4vw, 4rem);
  padding: clamp(2rem, 4.5vw, 4.5rem) 0;
  border-bottom: 1px solid rgba(245, 241, 232, 0.14);
}

.note-number,
.note-meta {
  color: rgba(245, 241, 232, 0.52);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.note-number {
  color: var(--accent-1);
}

.note-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.note-main h2,
.notes-cta h2 {
  max-width: 72rem;
  margin: 0;
  color: var(--light);
  font-size: clamp(2.25rem, 5.6vw, 5.8rem);
  line-height: 0.9;
  font-weight: 680;
}

.note-main p {
  max-width: 44rem;
  margin: 1.1rem 0 0;
  color: rgba(245, 241, 232, 0.68);
  font-size: clamp(1rem, 1.35vw, 1.12rem);
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: start;
}

.note-tags span {
  padding: 0.45rem 0.65rem;
  border: 1px solid rgba(245, 241, 232, 0.13);
  border-radius: 999px;
  color: rgba(245, 241, 232, 0.72);
  font-size: 0.75rem;
  font-weight: 800;
}

.notes-cta {
  display: flex;
  min-height: 72svh;
  flex-direction: column;
  justify-content: center;
  padding: 7rem var(--section-x);
}

.notes-cta a {
  width: fit-content;
  margin-top: 2rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid rgba(var(--accent-1-rgb), 0.4);
  border-radius: 999px;
  color: var(--accent-1);
  font-weight: 850;
}

@media (max-width: 840px) {
  .note-row {
    grid-template-columns: 1fr;
  }

  .note-meta {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .notes-hero,
  .notes-index,
  .notes-cta {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
