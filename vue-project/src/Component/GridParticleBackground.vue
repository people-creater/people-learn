<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'home',
  },
  intensity: {
    type: Number,
    default: 0.9,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const root = ref(null)
const canvas = ref(null)
const canvasActive = ref(false)

let context = null
let frame = 0
let observer = null
let reduceMotionQuery = null
let points = []
let width = 0
let height = 0
let dpr = 1
let visible = true
let reducedMotion = false
let time = 0

const pointer = {
  x: 0.62,
  y: 0.46,
  targetX: 0.62,
  targetY: 0.46,
}

const palette = computed(() => {
  if (props.variant === 'studio') {
    return {
      glow: 'rgba(122, 168, 255, ',
      accent: 'rgba(215, 255, 99, ',
      secondary: 'rgba(255, 107, 74, ',
    }
  }

  if (props.variant === 'start') {
    return {
      glow: 'rgba(255, 107, 74, ',
      accent: 'rgba(215, 255, 99, ',
      secondary: 'rgba(122, 168, 255, ',
    }
  }

  return {
    glow: 'rgba(215, 255, 99, ',
    accent: 'rgba(122, 168, 255, ',
    secondary: 'rgba(255, 107, 74, ',
  }
})

const shouldFallback = () => props.disabled || reducedMotion || window.innerWidth < 860

const buildPoints = () => {
  points = []
  const gap = width < 980 ? 32 : 36

  for (let y = -gap; y < height + gap; y += gap) {
    for (let x = -gap; x < width + gap; x += gap) {
      points.push({
        x,
        y,
        seed: Math.random() * 10,
        majorX: Math.round(x) % (gap * 2) === 0,
        majorY: Math.round(y) % (gap * 2) === 0,
      })
    }
  }
}

const resize = () => {
  if (!canvas.value || !context) return

  width = window.innerWidth
  height = window.innerHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  buildPoints()
}

const drawLine = (x1, y1, x2, y2, alpha) => {
  context.strokeStyle = `rgba(245, 241, 232, ${alpha})`
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
}

const render = () => {
  frame = 0
  if (!context || !canvasActive.value || !visible || document.hidden) return

  time += 0.016
  pointer.x += (pointer.targetX - pointer.x) * 0.085
  pointer.y += (pointer.targetY - pointer.y) * 0.085

  const colors = palette.value
  const magneticX = pointer.x * width
  const magneticY = pointer.y * height
  context.clearRect(0, 0, width, height)
  context.lineWidth = 1

  for (const point of points) {
    const dx = point.x - magneticX
    const dy = point.y - magneticY
    const distance = Math.hypot(dx, dy)
    const falloff = Math.max(0, 1 - distance / 190)
    const magneticPush = falloff * falloff * 28
    const driftX = Math.sin(time * 2 + point.seed) * falloff * 5
    const driftY = Math.cos(time * 2 + point.seed) * falloff * 5
    const x = point.x + (dx / (distance || 1)) * magneticPush + driftX
    const y = point.y + (dy / (distance || 1)) * magneticPush + driftY
    const alpha = (0.02 + falloff * 0.28) * props.intensity
    const size = 0.9 + falloff * 2.15

    if (point.majorX) {
      drawLine(x, -24, x, height + 24, alpha * 0.055)
    }

    if (point.majorY) {
      drawLine(-24, y, width + 24, y, alpha * 0.045)
    }

    context.fillStyle = falloff > 0.04
      ? `${colors.glow}${0.08 + falloff * 0.42})`
      : `rgba(245, 241, 232, ${0.018 * props.intensity})`
    context.fillRect(x - size / 2, y - size / 2, size, size)
  }

  const radius = 230
  const gradient = context.createRadialGradient(magneticX, magneticY, 0, magneticX, magneticY, radius)
  gradient.addColorStop(0, `${colors.accent}${0.065 * props.intensity})`)
  gradient.addColorStop(0.42, `${colors.secondary}${0.028 * props.intensity})`)
  gradient.addColorStop(1, 'rgba(8, 8, 7, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)

  frame = requestAnimationFrame(render)
}

const stop = () => {
  if (frame) {
    cancelAnimationFrame(frame)
    frame = 0
  }
}

const start = () => {
  if (frame || !canvasActive.value || !visible || document.hidden) return
  frame = requestAnimationFrame(render)
}

const syncMode = () => {
  const fallback = shouldFallback()
  canvasActive.value = !fallback
  if (fallback) {
    stop()
    return
  }

  requestAnimationFrame(() => {
    context = canvas.value?.getContext('2d', { alpha: true }) || null
    resize()
    start()
  })
}

const handlePointerMove = (event) => {
  if (!canvasActive.value) return
  pointer.targetX = Math.min(1, Math.max(0, event.clientX / window.innerWidth))
  pointer.targetY = Math.min(1, Math.max(0, event.clientY / window.innerHeight))
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stop()
  } else {
    start()
  }
}

const handleReduceMotionChange = (event) => {
  reducedMotion = event.matches
  syncMode()
}

onMounted(() => {
  reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = reduceMotionQuery.matches
  reduceMotionQuery.addEventListener('change', handleReduceMotionChange)

  observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    if (visible) start()
    else stop()
  })

  if (root.value) {
    observer.observe(root.value)
  }

  window.addEventListener('resize', syncMode)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
  syncMode()
})

onUnmounted(() => {
  stop()
  observer?.disconnect()
  observer = null
  reduceMotionQuery?.removeEventListener('change', handleReduceMotionChange)
  reduceMotionQuery = null
  window.removeEventListener('resize', syncMode)
  window.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  points = []
  context = null
})

watch(() => props.disabled, syncMode)
</script>

<template>
  <div
    ref="root"
    class="grid-particle-background"
    :class="[`grid-particle-background--${variant}`, { 'is-static': !canvasActive }]"
    :style="{ '--grid-intensity': intensity }"
    aria-hidden="true"
  >
    <canvas v-if="canvasActive" ref="canvas"></canvas>
    <div v-else class="grid-particle-background__fallback"></div>
  </div>
</template>

<style scoped>
.grid-particle-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: var(--grid-intensity, 0.9);
}

.grid-particle-background canvas,
.grid-particle-background__fallback {
  position: sticky;
  top: 0;
  display: block;
  width: 100%;
  height: 100svh;
}

.grid-particle-background__fallback {
  background-image:
    radial-gradient(circle at 72% 18%, rgba(122, 168, 255, 0.12), transparent 30rem),
    radial-gradient(circle at 16% 78%, rgba(215, 255, 99, 0.1), transparent 28rem),
    linear-gradient(90deg, rgba(245, 241, 232, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(245, 241, 232, 0.06) 1px, transparent 1px);
  background-size: auto, auto, 36px 36px, 36px 36px;
}

.grid-particle-background--studio .grid-particle-background__fallback {
  background-image:
    radial-gradient(circle at 76% 18%, rgba(122, 168, 255, 0.14), transparent 30rem),
    radial-gradient(circle at 18% 72%, rgba(215, 255, 99, 0.09), transparent 28rem),
    linear-gradient(90deg, rgba(245, 241, 232, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(245, 241, 232, 0.055) 1px, transparent 1px);
}

.grid-particle-background--start .grid-particle-background__fallback {
  background-image:
    radial-gradient(circle at 72% 20%, rgba(255, 107, 74, 0.13), transparent 30rem),
    radial-gradient(circle at 18% 72%, rgba(215, 255, 99, 0.1), transparent 28rem),
    linear-gradient(90deg, rgba(245, 241, 232, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(245, 241, 232, 0.055) 1px, transparent 1px);
}

@media (max-width: 859px) {
  .grid-particle-background {
    position: absolute;
  }
}
</style>
