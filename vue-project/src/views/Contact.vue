<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GridParticleBackground from '../Component/GridParticleBackground.vue'

const startRoot = ref(null)
let ctx = null

const form = ref({
  name: '',
  email: '',
  focus: '',
  message: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')

const fitSignals = [
  'A product or portfolio needs a stronger first impression.',
  'The interface has content, but the story feels scattered.',
  'Motion and interaction should clarify the experience.',
  'The final build needs responsive verification and polish.',
]

const contactChannels = [
  { label: 'Email', value: 'hello@example.com', link: 'mailto:hello@example.com' },
  { label: 'Availability', value: 'Selective project windows', link: '#' },
  { label: 'Mode', value: 'Remote collaboration', link: '#' },
]

const handleSubmit = async () => {
  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 900))
  isSubmitting.value = false
  submitMessage.value = 'Brief received. I will review the direction and respond with next steps.'
  form.value = { name: '', email: '', focus: '', message: '' }
  window.setTimeout(() => {
    submitMessage.value = ''
  }, 3200)
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const root = startRoot.value
  if (!root) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = gsap.context(() => {
    if (reduceMotion) {
      gsap.set('.start-reveal', { autoAlpha: 1, y: 0 })
      return
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.start-hero-copy', { autoAlpha: 0, y: 36, duration: 0.78 }, 0)
      .from('.brief-panel', { autoAlpha: 0, y: 28, duration: 0.72 }, 0.2)

    gsap.utils.toArray('.start-reveal').forEach((block) => {
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
  <main ref="startRoot" class="start-page dark-stage-page">
    <div class="page-grid-stage" aria-hidden="true">
      <GridParticleBackground variant="start" :intensity="0.78" />
    </div>

    <section class="start-hero dark-stage-hero">
      <div class="start-hero-copy">
        <p class="stage-eyebrow">Start</p>
        <h1 class="stage-title">Brief the next interface before it becomes noise.</h1>
        <p class="stage-copy">
          A focused starting point for product direction, motion systems, and launch-ready frontend work.
        </p>
      </div>

      <form class="brief-panel" @submit.prevent="handleSubmit">
        <p class="stage-eyebrow">Brief</p>
        <div class="form-grid">
          <label>
            Name
            <input v-model="form.name" type="text" autocomplete="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input v-model="form.email" type="email" autocomplete="email" required placeholder="you@example.com" />
          </label>
        </div>
        <label>
          Focus
          <input v-model="form.focus" type="text" required placeholder="Strategy, Interface, Motion, Delivery" />
        </label>
        <label>
          Message
          <textarea v-model="form.message" rows="6" required placeholder="Tell me what needs to become clearer." />
        </label>
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending Brief' : 'Send Brief' }}
        </button>
        <p v-if="submitMessage" class="submit-message">{{ submitMessage }}</p>
      </form>
    </section>

    <section class="fit-section content-panel">
      <div class="section-heading start-reveal">
        <p class="stage-eyebrow">Fit</p>
        <h2>Good projects usually start with one of these signals.</h2>
      </div>
      <div class="fit-list">
        <article v-for="(signal, index) in fitSignals" :key="signal" class="fit-item start-reveal">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ signal }}</p>
        </article>
      </div>
    </section>

    <section class="contact-section content-panel">
      <div class="section-heading start-reveal">
        <p class="stage-eyebrow">Contact</p>
        <h2>Keep the channel direct and the brief specific.</h2>
      </div>
      <div class="contact-list">
        <a
          v-for="channel in contactChannels"
          :key="channel.label"
          :href="channel.link"
          class="contact-link start-reveal"
        >
          <span>{{ channel.label }}</span>
          <strong>{{ channel.value }}</strong>
        </a>
      </div>
    </section>

    <section class="next-section content-panel">
      <div class="start-reveal">
        <p class="stage-eyebrow">Next Step</p>
        <h2>From first signal to inspected build.</h2>
      </div>
    </section>
  </main>
</template>

<style scoped>
.start-hero {
  display: grid;
  grid-template-columns: minmax(24rem, 0.92fr) minmax(22rem, 0.56fr);
  min-height: 100svh;
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  padding: 8rem var(--section-x) 4rem;
}

.start-hero-copy {
  max-width: 76rem;
}

.start-hero .stage-copy {
  max-width: 40rem;
  margin-top: 1.4rem;
}

.brief-panel {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(245, 241, 232, 0.16);
  border-radius: 8px;
  background: rgba(8, 8, 7, 0.68);
  backdrop-filter: blur(10px);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.brief-panel label {
  display: grid;
  gap: 0.45rem;
  color: rgba(245, 241, 232, 0.62);
  font-size: 0.76rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.brief-panel input,
.brief-panel textarea {
  width: 100%;
  border: 1px solid rgba(245, 241, 232, 0.14);
  border-radius: 6px;
  background: rgba(245, 241, 232, 0.06);
  color: var(--light);
  padding: 0.85rem 0.9rem;
  resize: vertical;
}

.brief-panel input:focus,
.brief-panel textarea:focus {
  border-color: rgba(var(--accent-1-rgb), 0.58);
}

.brief-panel button {
  min-height: 46px;
  border: 1px solid rgba(var(--accent-1-rgb), 0.44);
  border-radius: 999px;
  color: var(--dark);
  background: var(--accent-1);
  font-weight: 850;
}

.brief-panel button:disabled {
  opacity: 0.62;
  cursor: wait;
}

.submit-message {
  color: rgba(245, 241, 232, 0.72);
  font-size: 0.9rem;
}

.fit-section,
.contact-section,
.next-section {
  padding: 7rem var(--section-x);
}

.section-heading {
  max-width: 74rem;
  margin-bottom: clamp(2.4rem, 5vw, 5rem);
}

.section-heading h2,
.next-section h2 {
  margin: 0;
  color: var(--light);
  font-size: clamp(2.35rem, 5.6vw, 5.8rem);
  line-height: 0.9;
  font-weight: 680;
}

.fit-list,
.contact-list {
  display: grid;
  border-top: 1px solid rgba(245, 241, 232, 0.14);
}

.fit-item,
.contact-link {
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  gap: 1rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(245, 241, 232, 0.14);
}

.fit-item span,
.contact-link span {
  color: var(--accent-1);
  font-size: 0.78rem;
  font-weight: 850;
}

.fit-item p,
.contact-link strong {
  margin: 0;
  color: rgba(245, 241, 232, 0.78);
  font-size: clamp(1.1rem, 2vw, 1.55rem);
  font-weight: 560;
}

.next-section {
  display: flex;
  min-height: 72svh;
  align-items: center;
}

.next-section > div {
  max-width: 76rem;
}

@media (max-width: 920px) {
  .start-hero,
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .start-hero,
  .fit-section,
  .contact-section,
  .next-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .fit-item,
  .contact-link {
    grid-template-columns: 1fr;
  }
}
</style>
