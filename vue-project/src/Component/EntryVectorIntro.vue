<script setup>
import gsap from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits(['complete'])

const root = ref(null)
let ctx
let timeline
let handoffTimeline
let isComplete = false

const logoTargetSelector = '[data-logo-target]'

const letters = [
  { id: 'p-1', char: 'P', x: 262, y: 345 },
  { id: 'e-1', char: 'E', x: 338, y: 345 },
  { id: 'o-1', char: 'O', x: 414, y: 345 },
  { id: 'p-2', char: 'P', x: 494, y: 345 },
  { id: 'l-1', char: 'L', x: 568, y: 345 },
  { id: 'e-2', char: 'E', x: 636, y: 345 },
  { id: 'l-2', char: 'L', x: 738, y: 345 },
  { id: 'e-3', char: 'E', x: 806, y: 345 },
  { id: 'a-1', char: 'A', x: 882, y: 345 },
  { id: 'r-1', char: 'R', x: 962, y: 345 },
  { id: 'n-1', char: 'N', x: 1042, y: 345 },
]

const fragments = [
  { id: 'f1', x: 116, y: 126, w: 88, h: 8, r: -16, fill: 'var(--accent-1)' },
  { id: 'f2', x: 228, y: 104, w: 64, h: 8, r: 23, fill: 'var(--accent-3)' },
  { id: 'f3', x: 334, y: 138, w: 118, h: 7, r: -10, fill: 'var(--light)' },
  { id: 'f4', x: 492, y: 94, w: 76, h: 9, r: 18, fill: 'var(--accent-2)' },
  { id: 'f5', x: 682, y: 118, w: 94, h: 8, r: -20, fill: 'var(--accent-1)' },
  { id: 'f6', x: 826, y: 98, w: 132, h: 7, r: 9, fill: 'var(--accent-3)' },
  { id: 'f7', x: 1010, y: 142, w: 74, h: 8, r: -28, fill: 'var(--light)' },
  { id: 'f8', x: 106, y: 248, w: 54, h: 54, r: 18, fill: 'none' },
  { id: 'f9', x: 204, y: 470, w: 116, h: 7, r: 14, fill: 'var(--accent-2)' },
  { id: 'f10', x: 386, y: 512, w: 72, h: 8, r: -22, fill: 'var(--accent-1)' },
  { id: 'f11', x: 532, y: 478, w: 136, h: 7, r: 11, fill: 'var(--light)' },
  { id: 'f12', x: 742, y: 522, w: 84, h: 8, r: -17, fill: 'var(--accent-3)' },
  { id: 'f13', x: 884, y: 470, w: 126, h: 7, r: 15, fill: 'var(--accent-1)' },
  { id: 'f14', x: 1024, y: 512, w: 58, h: 58, r: -12, fill: 'none' },
  { id: 'f15', x: 140, y: 596, w: 154, h: 6, r: -4, fill: 'var(--light)' },
  { id: 'f16', x: 942, y: 586, w: 168, h: 6, r: 5, fill: 'var(--accent-2)' },
]

const complete = () => {
  if (isComplete) return
  isComplete = true
  document.body.classList.remove('entry-intro-handoff')
  emit('complete')
}

const skipIntro = () => {
  timeline?.kill()
  handoffTimeline?.kill()
  document.body.classList.remove('entry-intro-handoff')
  if (root.value) {
    gsap.to(root.value, {
      autoAlpha: 0,
      duration: 0.24,
      ease: 'power2.out',
      onComplete: complete,
    })
  } else {
    complete()
  }
}

const runLogoHandoff = () => {
  const introRoot = root.value
  const wordmark = introRoot?.querySelector('.wordmark')
  const handoffLogo = introRoot?.querySelector('.intro-logo-handoff')
  const handoffLearn = introRoot?.querySelector('.intro-logo-handoff-learn')
  const logoTarget = document.querySelector(logoTargetSelector)

  if (!introRoot || !wordmark || !handoffLogo || !logoTarget) {
    handoffTimeline = gsap.to(introRoot, {
      autoAlpha: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    })
    return
  }

  document.body.classList.add('entry-intro-handoff')

  const wordmarkRect = wordmark.getBoundingClientRect()
  const targetRect = logoTarget.getBoundingClientRect()
  const startCenterX = wordmarkRect.left + wordmarkRect.width / 2
  const startCenterY = wordmarkRect.top + wordmarkRect.height / 2
  const targetCenterX = targetRect.left + targetRect.width / 2
  const targetCenterY = targetRect.top + targetRect.height / 2
  const targetScale = Math.min(
    targetRect.width / wordmarkRect.width,
    targetRect.height / wordmarkRect.height,
  )

  gsap.set(handoffLogo, {
    autoAlpha: 1,
    left: wordmarkRect.left,
    top: wordmarkRect.top,
    width: wordmarkRect.width,
    height: wordmarkRect.height,
    x: 0,
    y: 0,
    scale: 1,
    fontSize: Math.max(42, wordmarkRect.height * 0.62),
    transformOrigin: '50% 50%',
  })

  handoffTimeline?.kill()
  handoffTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

  handoffTimeline
    .to(wordmark, { autoAlpha: 0, duration: 0.16 }, 0)
    .to('.glyph-fragment', { autoAlpha: 0, scale: 0.62, duration: 0.34, stagger: { amount: 0.12, from: 'random' } }, 0)
    .to('.blueprint-grid', { autoAlpha: 0.14, duration: 0.45 }, 0)
    .to('.stage-frame', { autoAlpha: 0.12, duration: 0.45 }, 0)
    .to(
      introRoot,
      {
        '--intro-bg-alpha': 0,
        '--intro-gradient-alpha': 0.18,
        '--intro-grid-opacity': 0.04,
        duration: 0.58,
        ease: 'sine.inOut',
      },
      0.02,
    )
    .to(
      handoffLogo,
      {
        x: targetCenterX - startCenterX,
        y: targetCenterY - startCenterY,
        scale: targetScale,
        duration: 0.84,
      },
      0.08,
    )
    .to(
      handoffLearn,
      {
        color: '#11110f',
        duration: 0.42,
        ease: 'power2.out',
      },
      0.48,
    )
    .to(
      handoffLogo,
      {
        filter: 'drop-shadow(0 0 0 rgba(215, 255, 99, 0))',
        duration: 0.4,
        ease: 'power2.out',
      },
      0.48,
    )
    .to(
      handoffLogo,
      {
        scale: targetScale * 1.04,
        duration: 0.12,
        ease: 'power2.out',
      },
      0.9,
    )
    .to(
      handoffLogo,
      {
        scale: targetScale,
        duration: 0.14,
        ease: 'power2.out',
      },
      1.02,
    )
    .to(
      introRoot,
      {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.out',
      },
      1.08,
    )
}

onMounted(() => {
  if (!root.value) return

  document.body.classList.add('entry-intro-active')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    const strokes = gsap.utils.toArray('.intro-stroke')

    strokes.forEach((stroke) => {
      const length = stroke.getTotalLength?.() || 720
      stroke.style.strokeDasharray = length
      stroke.style.strokeDashoffset = length
    })

    gsap.set('.intro-letter', {
      autoAlpha: reduceMotion ? 1 : 0,
      transformOrigin: '50% 50%',
    })
    gsap.set('.glyph-fragment', {
      transformOrigin: '50% 50%',
    })
    gsap.set('.word-underline', {
      scaleX: reduceMotion ? 1 : 0,
      transformOrigin: '50% 50%',
    })

    if (reduceMotion) {
      timeline = gsap.timeline({ onComplete: complete })
      timeline
        .set(strokes, { strokeDashoffset: 0 })
        .set('.glyph-fragment', { autoAlpha: 0 })
        .set('.intro-logo-handoff', { autoAlpha: 0 })
        .to(root.value, { autoAlpha: 0, duration: 0.2, delay: 0.55 })
      return
    }

    timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: complete,
    })

    timeline
      .fromTo(
        '.intro-shell',
        { autoAlpha: 0, scale: 0.96 },
        { autoAlpha: 1, scale: 1, duration: 0.35 },
        0,
      )
      .to(
        strokes,
        {
          strokeDashoffset: 0,
          duration: 1.15,
          ease: 'power2.inOut',
          stagger: { amount: 0.45, from: 'random' },
        },
        0.08,
      )
      .fromTo(
        '.glyph-fragment',
        {
          autoAlpha: 0,
          x: () => gsap.utils.random(-260, 260),
          y: () => gsap.utils.random(-190, 190),
          rotation: () => gsap.utils.random(-70, 70),
          scale: () => gsap.utils.random(0.24, 0.72),
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.05,
          ease: 'expo.out',
          stagger: { amount: 0.55, from: 'random' },
        },
        0.18,
      )
      .fromTo(
        '.intro-letter',
        {
          autoAlpha: 0,
          x: () => gsap.utils.random(-180, 180),
          y: () => gsap.utils.random(-120, 120),
          rotation: () => gsap.utils.random(-32, 32),
          scale: 0.62,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.18,
          ease: 'expo.out',
          stagger: { each: 0.045, from: 'center' },
        },
        0.82,
      )
      .to(
        '.glyph-fragment',
        {
          autoAlpha: 0.34,
          x: () => gsap.utils.random(-10, 10),
          y: () => gsap.utils.random(-8, 8),
          duration: 0.5,
          stagger: { amount: 0.25, from: 'edges' },
        },
        1.4,
      )
      .to(
        '.word-underline',
        {
          scaleX: 1,
          duration: 0.68,
          ease: 'power4.out',
        },
        1.48,
      )
      .fromTo(
        '.scan-beam',
        { x: -140, autoAlpha: 0 },
        { x: 1220, autoAlpha: 1, duration: 0.72, ease: 'power1.inOut' },
        1.62,
      )
      .to('.scan-beam', { autoAlpha: 0, duration: 0.18 }, 2.2)
      .to(
        '.wordmark',
        {
          scale: 1.055,
          duration: 0.32,
          yoyo: true,
          repeat: 1,
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
        },
        2.05,
      )
      .to('.intro-shell', { scale: 1.06, duration: 0.38, ease: 'power2.inOut' }, 2.34)
      .call(runLogoHandoff, [], 2.48)
      .to({}, { duration: 1.3 }, 2.48)
  }, root.value)
})

onUnmounted(() => {
  document.body.classList.remove('entry-intro-active')
  document.body.classList.remove('entry-intro-handoff')
  handoffTimeline?.kill()
  ctx?.revert()
})
</script>

<template>
  <div ref="root" class="entry-intro" role="presentation">
    <button class="entry-skip" type="button" @click="skipIntro">Skip</button>
    <div class="intro-logo-handoff" aria-hidden="true">
      <span>People</span>
      <span class="intro-logo-handoff-learn">Learn</span>
    </div>

    <svg
      class="entry-vector"
      viewBox="0 0 1200 720"
      aria-hidden="true"
      focusable="false"
    >
      <title>PEOPLE LEARN entry animation</title>
      <defs>
        <filter id="entryGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.83 0 0 0 0 1 0 0 0 0 0.38 0 0 0 0.7 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="transparent" />
          <stop offset="40%" stop-color="#d7ff63" stop-opacity="0.05" />
          <stop offset="50%" stop-color="#d7ff63" stop-opacity="0.75" />
          <stop offset="60%" stop-color="#7aa8ff" stop-opacity="0.18" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
      </defs>

      <g class="intro-shell">
        <rect class="stage-frame" x="58" y="58" width="1084" height="604" rx="10" />

        <g class="blueprint-grid">
          <path class="intro-stroke" d="M116 188 H1084" />
          <path class="intro-stroke" d="M116 532 H1084" />
          <path class="intro-stroke" d="M188 116 V604" />
          <path class="intro-stroke" d="M1012 116 V604" />
          <path class="intro-stroke" d="M186 410 C328 472 456 220 600 352 S866 448 1014 278" />
          <path class="intro-stroke" d="M250 250 C362 174 482 168 600 236 S832 298 972 184" />
          <path class="intro-stroke" d="M246 442 C416 372 518 506 674 448 S856 364 980 452" />
          <circle class="intro-stroke" cx="600" cy="344" r="214" />
          <circle class="intro-stroke" cx="600" cy="344" r="152" />
        </g>

        <g class="fragment-field">
          <template v-for="fragment in fragments" :key="fragment.id">
            <rect
              v-if="fragment.fill !== 'none'"
              class="glyph-fragment"
              :x="fragment.x"
              :y="fragment.y"
              :width="fragment.w"
              :height="fragment.h"
              rx="2"
              :fill="fragment.fill"
              :transform="`rotate(${fragment.r} ${fragment.x + fragment.w / 2} ${fragment.y + fragment.h / 2})`"
            />
            <rect
              v-else
              class="glyph-fragment outline-fragment"
              :x="fragment.x"
              :y="fragment.y"
              :width="fragment.w"
              :height="fragment.h"
              rx="5"
              :transform="`rotate(${fragment.r} ${fragment.x + fragment.w / 2} ${fragment.y + fragment.h / 2})`"
            />
          </template>
        </g>

        <g class="wordmark" filter="url(#entryGlow)">
          <text
            v-for="letter in letters"
            :key="letter.id"
            class="intro-letter"
            :x="letter.x"
            :y="letter.y"
            text-anchor="middle"
          >
            {{ letter.char }}
          </text>
          <line class="word-underline" x1="226" y1="394" x2="1076" y2="394" />
          <line class="word-underline thin" x1="334" y1="418" x2="970" y2="418" />
        </g>

        <rect class="scan-beam" x="-80" y="62" width="150" height="596" fill="url(#beamGradient)" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.entry-intro {
  --intro-bg-alpha: 1;
  --intro-gradient-alpha: 1;
  --intro-grid-opacity: 0.16;
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(215, 255, 99, calc(var(--intro-gradient-alpha) * 0.07)), transparent 34%),
    linear-gradient(225deg, rgba(122, 168, 255, calc(var(--intro-gradient-alpha) * 0.12)), transparent 30%),
    rgba(8, 8, 7, var(--intro-bg-alpha));
  color: var(--light);
}

.entry-intro::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: var(--intro-grid-opacity);
  background-image:
    linear-gradient(90deg, rgba(245, 241, 232, 0.12) 1px, transparent 1px),
    linear-gradient(rgba(245, 241, 232, 0.1) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at 50% 48%, black, transparent 72%);
}

.intro-logo-handoff {
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.42em;
  opacity: 0;
  pointer-events: none;
  color: var(--light);
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: uppercase;
  filter: drop-shadow(0 0 22px rgba(215, 255, 99, 0.28));
  will-change: transform, opacity, filter;
}

.intro-logo-handoff span:first-child {
  padding: 0.34em 0.54em;
  color: var(--light);
  background: var(--daik);
  border-radius: 999px;
}

.intro-logo-handoff-learn {
  color: var(--light);
}

.entry-vector {
  position: relative;
  z-index: 1;
  width: min(1120px, 92vw);
  max-height: min(720px, 82svh);
  overflow: visible;
}

.entry-skip {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 2;
  min-width: 74px;
  min-height: 40px;
  padding: 0 0.85rem;
  color: var(--light);
  border: 1px solid rgba(245, 241, 232, 0.24);
  border-radius: 999px;
  background: rgba(245, 241, 232, 0.06);
  backdrop-filter: blur(12px);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.entry-skip:hover {
  color: var(--dark);
  background: var(--accent-1);
  border-color: var(--accent-1);
}

.intro-shell {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.stage-frame {
  fill: rgba(245, 241, 232, 0.025);
  stroke: rgba(245, 241, 232, 0.2);
  stroke-width: 1.5;
}

.intro-stroke {
  fill: none;
  stroke: rgba(245, 241, 232, 0.28);
  stroke-width: 1.3;
  vector-effect: non-scaling-stroke;
}

.blueprint-grid .intro-stroke:nth-child(5),
.blueprint-grid .intro-stroke:nth-child(6),
.blueprint-grid .intro-stroke:nth-child(7) {
  stroke: rgba(122, 168, 255, 0.42);
}

.blueprint-grid .intro-stroke:nth-child(8),
.blueprint-grid .intro-stroke:nth-child(9) {
  stroke: rgba(215, 255, 99, 0.34);
}

.glyph-fragment {
  opacity: 0;
  will-change: transform, opacity;
}

.outline-fragment {
  fill: transparent;
  stroke: rgba(245, 241, 232, 0.74);
  stroke-width: 7;
}

.intro-letter {
  fill: var(--light);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 88px;
  font-weight: 900;
  letter-spacing: 0;
  paint-order: stroke fill;
  stroke: rgba(8, 8, 7, 0.55);
  stroke-width: 2px;
  will-change: transform, opacity;
}

.wordmark {
  transform-origin: 50% 50%;
  will-change: transform;
}

.word-underline {
  stroke: var(--accent-1);
  stroke-linecap: round;
  stroke-width: 6;
  vector-effect: non-scaling-stroke;
}

.word-underline.thin {
  opacity: 0.62;
  stroke: var(--accent-3);
  stroke-width: 2;
}

.scan-beam {
  opacity: 0;
  mix-blend-mode: screen;
}

@media (max-width: 720px) {
  .entry-vector {
    width: 104vw;
  }

  .entry-skip {
    top: 0.85rem;
    right: 0.85rem;
  }
}
</style>
