<script setup>
import {
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Float32BufferAttribute,
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from 'three'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  mediaTextures: {
    type: Array,
    default: () => [],
  },
  variant: {
    type: String,
    default: 'hero',
    validator: (value) => ['hero', 'studio'].includes(value),
  },
  quality: {
    type: String,
    default: 'full',
    validator: (value) => ['full', 'fallback'].includes(value),
  },
  layout: {
    type: String,
    default: 'local-stage',
    validator: (value) => ['local-stage', 'page-stage'].includes(value),
  },
  intensity: {
    type: Number,
    default: 0.9,
  },
})

const root = ref(null)
const canvasHost = ref(null)
const fallbackActive = ref(false)

let renderer = null
let scene = null
let camera = null
let animationFrame = 0
let resizeObserver = null
let visibilityObserver = null
let reducedMotionQuery = null
let reducedMotion = false
let isVisible = false
let isDestroyed = false
let cardGroups = []
let particleField = null
let ambientPlane = null

const pageStage = () => props.layout === 'page-stage'

const pointer = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
}

const scroll = {
  value: 0,
  target: 0,
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const lerp = (from, to, progress) => from + (to - from) * progress
const smoothStep = (progress) => progress * progress * (3 - 2 * progress)

const getCardAccent = (card, index = 0) => card.accent || ['#d7ff63', '#ff6b4a', '#7aa8ff'][index % 3]

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + width - r, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + r)
  ctx.lineTo(x + width, y + height - r)
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
  ctx.lineTo(x + r, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

const drawCoverImage = (ctx, image, x, y, width, height) => {
  if (!image?.naturalWidth || !image?.naturalHeight) return

  const imageRatio = image.naturalWidth / image.naturalHeight
  const targetRatio = width / height
  let sourceWidth = image.naturalWidth
  let sourceHeight = image.naturalHeight
  let sourceX = 0
  let sourceY = 0

  if (imageRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio
    sourceX = (image.naturalWidth - sourceWidth) / 2
  } else {
    sourceHeight = image.naturalWidth / targetRatio
    sourceY = (image.naturalHeight - sourceHeight) / 2
  }

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
}

const drawGrid = (ctx, width, height, color, opacity = 0.16, gap = 96) => {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.strokeStyle = color
  ctx.lineWidth = 2

  for (let x = gap; x < width; x += gap) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  for (let y = gap; y < height; y += gap) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  ctx.restore()
}

const createFallbackTexture = (card, side, media, index) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1400

  const ctx = canvas.getContext('2d')
  const accent = getCardAccent(card, index)

  drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 64)
  ctx.fillStyle = '#11110f'
  ctx.fill()

  ctx.save()
  drawRoundedRect(ctx, 28, 28, canvas.width - 56, canvas.height - 56, 48)
  ctx.clip()

  if (side === 'back') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#2b3024')
    gradient.addColorStop(0.44, '#151716')
    gradient.addColorStop(1, '#080807')
    ctx.fillStyle = gradient
    ctx.fillRect(28, 28, canvas.width - 56, canvas.height - 56)
  } else {
    ctx.fillStyle = '#151512'
    ctx.fillRect(28, 28, canvas.width - 56, canvas.height - 56)
  }

  drawGrid(ctx, canvas.width, canvas.height, side === 'back' ? '#f5f1e8' : accent, side === 'back' ? 0.11 : 0.18)
  ctx.restore()

  ctx.fillStyle = accent
  ctx.fillRect(76, 104, 132, 12)
  ctx.fillRect(76, canvas.height - 170, canvas.width - 152, 4)

  ctx.fillStyle = '#f5f1e8'
  ctx.font = '700 56px Inter, Arial, sans-serif'
  ctx.fillText(card.title, 76, 182)
  ctx.textAlign = 'right'
  ctx.fillText(card.number, canvas.width - 76, 182)
  ctx.textAlign = 'left'

  ctx.fillStyle = '#f5f1e8'
  ctx.font = '800 114px Inter, Arial, sans-serif'
  ctx.fillText(side === 'front' ? card.title.toUpperCase() : media?.label || 'TEXTURE', 76, 610)

  ctx.fillStyle = 'rgba(245, 241, 232, 0.72)'
  ctx.font = '500 42px Inter, Arial, sans-serif'
  const copy = side === 'front' ? card.summary : 'Image-backed method surface'
  ctx.fillText(copy || 'Motion-ready capability card.', 76, 700)

  if (side === 'back') {
    ctx.font = '700 50px Inter, Arial, sans-serif'
    ;(card.items || []).forEach((item, itemIndex) => {
      const y = 870 + itemIndex * 116
      drawRoundedRect(ctx, 76, y - 70, canvas.width - 152, 88, 18)
      ctx.fillStyle = 'rgba(245, 241, 232, 0.11)'
      ctx.fill()
      ctx.fillStyle = '#f5f1e8'
      ctx.fillText(item, 112, y)
    })
  } else {
    ctx.globalAlpha = 0.5
    ctx.font = '800 250px Inter, Arial, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(card.number, canvas.width - 66, 1258)
    ctx.globalAlpha = 1
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

const createMediaTexture = (card, media, image, index) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1400

  const ctx = canvas.getContext('2d')
  const accent = getCardAccent(card, index)

  drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 64)
  ctx.fillStyle = '#0c0c0a'
  ctx.fill()

  ctx.save()
  drawRoundedRect(ctx, 28, 28, canvas.width - 56, canvas.height - 56, 48)
  ctx.clip()
  drawCoverImage(ctx, image, 28, 28, canvas.width - 56, canvas.height - 56)

  const overlay = ctx.createLinearGradient(0, 0, 0, canvas.height)
  overlay.addColorStop(0, 'rgba(8, 8, 7, 0.16)')
  overlay.addColorStop(0.48, 'rgba(8, 8, 7, 0.36)')
  overlay.addColorStop(1, 'rgba(8, 8, 7, 0.82)')
  ctx.fillStyle = overlay
  ctx.fillRect(28, 28, canvas.width - 56, canvas.height - 56)
  ctx.fillStyle = 'rgba(8, 8, 7, 0.2)'
  ctx.fillRect(28, 28, canvas.width - 56, canvas.height - 56)
  drawGrid(ctx, canvas.width, canvas.height, '#f5f1e8', 0.1, 118)
  ctx.restore()

  ctx.fillStyle = accent
  ctx.fillRect(76, 104, 132, 12)
  ctx.fillRect(76, canvas.height - 170, canvas.width - 152, 4)

  ctx.fillStyle = '#f5f1e8'
  ctx.font = '700 56px Inter, Arial, sans-serif'
  ctx.fillText(card.title, 76, 182)
  ctx.textAlign = 'right'
  ctx.fillText(card.number, canvas.width - 76, 182)
  ctx.textAlign = 'left'

  ctx.font = '800 94px Inter, Arial, sans-serif'
  ctx.fillText(media?.label || card.title.toUpperCase(), 76, 610)

  ctx.font = '700 50px Inter, Arial, sans-serif'
  ;(card.items || []).forEach((item, itemIndex) => {
    const y = 842 + itemIndex * 118
    drawRoundedRect(ctx, 76, y - 70, canvas.width - 152, 88, 18)
    ctx.fillStyle = 'rgba(245, 241, 232, 0.13)'
    ctx.fill()
    ctx.fillStyle = '#f5f1e8'
    ctx.fillText(item, 112, y)
  })

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

const createStageTexture = (media, image) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1600
  canvas.height = 900

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#080807'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawCoverImage(ctx, image, 0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgba(8, 8, 7, 0.62)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const gradient = ctx.createRadialGradient(420, 240, 0, 420, 240, 760)
  gradient.addColorStop(0, 'rgba(215, 255, 99, 0.2)')
  gradient.addColorStop(0.5, 'rgba(122, 168, 255, 0.1)')
  gradient.addColorStop(1, 'rgba(8, 8, 7, 0.68)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'rgba(245, 241, 232, 0.66)'
  ctx.font = '700 56px Inter, Arial, sans-serif'
  ctx.fillText(media?.label || 'SPATIAL STAGE', 76, canvas.height - 92)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

const loadImage = (media, onLoad) => {
  if (!media?.src) return null

  const image = new Image()
  image.decoding = 'async'
  image.onload = () => {
    if (!isDestroyed) onLoad(image)
  }
  image.src = media.src
  return image
}

const assignTexture = (material, texture) => {
  if (material.map && material.map !== texture) {
    material.map.dispose()
  }

  material.map = texture
  material.needsUpdate = true
}

const createCardGroup = (card, index) => {
  const group = new Group()
  const media = props.mediaTextures[index]
  const accent = getCardAccent(card, index)

  group.userData.index = index
  group.userData.card = card

  const geometry = new PlaneGeometry(2.08, 2.92, 2, 2)
  const frontMaterial = new MeshBasicMaterial({
    map: createFallbackTexture(card, 'front', media, index),
    transparent: true,
    opacity: 0.96,
    side: FrontSide,
  })
  const backMaterial = new MeshBasicMaterial({
    map: createFallbackTexture(card, 'back', media, index),
    transparent: true,
    opacity: 0.96,
    side: FrontSide,
  })
  const shadowMaterial = new MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: props.variant === 'studio' ? 0.24 : 0.32,
    side: DoubleSide,
  })
  const edgeMaterial = new MeshBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.44,
    side: DoubleSide,
  })

  const front = new Mesh(geometry, frontMaterial)
  const back = new Mesh(geometry.clone(), backMaterial)
  const shadow = new Mesh(new PlaneGeometry(2.08, 2.92), shadowMaterial)
  const edge = new Mesh(new PlaneGeometry(2.15, 2.99), edgeMaterial)

  front.position.z = 0.012
  back.position.z = -0.012
  back.rotation.y = Math.PI
  shadow.position.set(0.2, -0.22, -0.1)
  edge.position.z = -0.018

  group.userData.backMaterial = backMaterial
  group.add(shadow, edge, front, back)

  loadImage(media, (image) => {
    assignTexture(backMaterial, createMediaTexture(card, media, image, index))
  })

  return group
}

const createAmbientPlane = () => {
  const media = props.mediaTextures[3] || props.mediaTextures[0]
  const material = new MeshBasicMaterial({
    map: createFallbackTexture({ title: 'Stage', number: '', summary: '' }, 'back', media, 0),
    transparent: true,
    opacity: props.variant === 'studio' ? 0.12 : 0.18,
    side: DoubleSide,
  })
  const plane = new Mesh(new PlaneGeometry(9.2, 5.2), material)
  plane.position.set(0, 0.1, -2.35)
  plane.rotation.z = props.variant === 'studio' ? -0.04 : 0.025

  loadImage(media, (image) => {
    assignTexture(material, createStageTexture(media, image))
  })

  return plane
}

const createParticleField = () => {
  const positions = []
  const count = props.variant === 'studio' ? 74 : 96

  for (let index = 0; index < count; index += 1) {
    const column = (index % 12) - 5.5
    const row = Math.floor(index / 12) - 3.5
    positions.push(
      column * 0.78 + Math.sin(index * 1.3) * 0.16,
      row * 0.64 + Math.cos(index * 1.7) * 0.13,
      -1.35 - (index % 6) * 0.2,
    )
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))

  const material = new PointsMaterial({
    color: 0xf5f1e8,
    size: props.variant === 'studio' ? 0.018 : 0.024,
    transparent: true,
    opacity: props.variant === 'studio' ? 0.16 : 0.22,
  })

  return new Points(geometry, material)
}

const setCardMaterialOpacity = (group, opacity) => {
  group.traverse((child) => {
    if (!child.material) return

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((material) => {
      const isShadow = child === group.children[0]
      const isEdge = child === group.children[1]
      material.opacity = isShadow ? opacity * 0.34 : isEdge ? opacity * 0.42 : opacity
    })
  })
}

const updateCardGroup = (group, index, time) => {
  const isStudio = props.variant === 'studio'
  const baseDetach = isStudio ? 0.48 : 0.58
  const detachProgress = smoothStep(clamp((scroll.value - 0.04) / (isStudio ? 0.62 : 0.5)))
  const detach = lerp(baseDetach, 1, detachProgress)
  const flip = smoothStep(clamp((scroll.value - (isStudio ? 0.28 : 0.34)) / 0.36))
  const exit = smoothStep(clamp((scroll.value - 0.82) / 0.2))
  const side = index - 1
  const floatStrength = isStudio ? 0.055 : 0.11
  const spread = isStudio ? 1.78 : 2.18
  const stackedSpread = isStudio ? 0.44 : 0.6
  const pageOffsetX = pageStage() ? (isStudio ? 1.1 : 1.45) : 0
  const pageScale = pageStage() ? (isStudio ? 0.82 : 0.84) : 1
  const floatY = reducedMotion ? 0 : Math.sin(time * 0.72 + index * 1.2) * floatStrength
  const floatZ = reducedMotion ? 0 : Math.cos(time * 0.58 + index) * floatStrength

  group.position.x = pageOffsetX + lerp(side * stackedSpread, side * spread, detach) + pointer.x * (isStudio ? 0.32 : 0.5)
  group.position.y = lerp(0.14 - index * 0.1, isStudio ? 0.08 - Math.abs(side) * 0.15 : 0.12 - Math.abs(side) * 0.24, detach)
    + floatY
    - exit * 0.34
    + pointer.y * (isStudio ? 0.12 : 0.22)
  group.position.z = lerp(0.34 - index * 0.1, -0.16 + Math.abs(side) * 0.13, detach) + floatZ
  group.rotation.x = lerp(-0.06, 0.08 * side, detach) + pointer.y * 0.05
  group.rotation.y = lerp(side * -0.14, Math.PI * flip + side * 0.18, detach) + pointer.x * 0.08
  group.rotation.z = lerp(side * -0.08, side * (isStudio ? 0.09 : 0.15), detach)
  group.scale.setScalar((lerp(isStudio ? 0.74 : 0.78, isStudio ? 0.92 : 1.03, detach) - exit * 0.12) * pageScale)
  setCardMaterialOpacity(group, (isStudio ? 0.82 : 0.9) - exit * 0.42)
}

const updateScrollTarget = () => {
  if (!root.value) return

  if (pageStage()) {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    scroll.target = clamp(window.scrollY / maxScroll)
    return
  }

  const trigger = root.value.closest('section') || root.value
  const rect = trigger.getBoundingClientRect()
  const distance = Math.max(1, rect.height - window.innerHeight * 0.25)
  scroll.target = clamp(-rect.top / distance)
}

const render = (time = 0) => {
  if (!renderer || !scene || !camera || fallbackActive.value || document.hidden) {
    animationFrame = 0
    return
  }

  const seconds = time * 0.001
  pointer.x += (pointer.targetX - pointer.x) * 0.065
  pointer.y += (pointer.targetY - pointer.y) * 0.065
  updateScrollTarget()
  scroll.value += (scroll.target - scroll.value) * 0.08

  camera.position.x = pointer.x * (props.variant === 'studio' ? 0.12 : 0.18)
  camera.position.y = pointer.y * (props.variant === 'studio' ? -0.08 : -0.12)
  camera.lookAt(0, 0, 0)

  cardGroups.forEach((group, index) => updateCardGroup(group, index, seconds))

  if (particleField) {
    particleField.rotation.z = seconds * (props.variant === 'studio' ? 0.01 : 0.018)
    particleField.position.x = pointer.x * 0.26
    particleField.position.y = pointer.y * 0.16
  }

  if (ambientPlane) {
    ambientPlane.position.x = (pageStage() ? (props.variant === 'studio' ? 0.62 : 0.82) : 0) + pointer.x * 0.16
    ambientPlane.position.y = pointer.y * 0.1
  }

  renderer.render(scene, camera)
  animationFrame = requestAnimationFrame(render)
}

const startRenderLoop = () => {
  if (animationFrame || fallbackActive.value || !renderer || !scene || !camera || !isVisible || document.hidden) {
    return
  }

  animationFrame = requestAnimationFrame(render)
}

const stopRenderLoop = () => {
  if (!animationFrame) return

  cancelAnimationFrame(animationFrame)
  animationFrame = 0
}

const resize = () => {
  if (!root.value || !renderer || !camera) return

  const width = root.value.clientWidth || window.innerWidth
  const height = pageStage()
    ? window.innerHeight
    : root.value.clientHeight || Math.round(window.innerHeight * 0.74)

  renderer.setSize(width, height, false)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  camera.aspect = width / height
  camera.position.z = pageStage() ? (props.variant === 'studio' ? 8.4 : 8.8) : props.variant === 'studio' ? 7.5 : 6.8
  camera.updateProjectionMatrix()
}

const shouldUseFallback = () => {
  if (props.quality === 'fallback' || reducedMotion) return true
  if (typeof window === 'undefined') return true
  return window.innerWidth < 860
}

const handlePointerMove = (event) => {
  if (fallbackActive.value || reducedMotion) return

  pointer.targetX = clamp(event.clientX / window.innerWidth - 0.5, -0.5, 0.5)
  pointer.targetY = clamp(event.clientY / window.innerHeight - 0.5, -0.5, 0.5)
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopRenderLoop()
    return
  }

  startRenderLoop()
}

const disposeScene = () => {
  if (!scene) return

  scene.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose()
    }

    if (!child.material) return

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((material) => {
      if (material.map) {
        material.map.dispose()
      }
      material.dispose()
    })
  })

  scene.clear()
}

const disposeWebgl = () => {
  stopRenderLoop()
  disposeScene()
  renderer?.dispose()
  renderer?.forceContextLoss()
  renderer?.domElement?.remove()

  renderer = null
  scene = null
  camera = null
  cardGroups = []
  particleField = null
  ambientPlane = null
}

const initScene = () => {
  if (!canvasHost.value || renderer || fallbackActive.value) return

  scene = new Scene()
  camera = new PerspectiveCamera(34, 1, 0.1, 100)
  camera.position.set(0, 0, pageStage() ? (props.variant === 'studio' ? 8.4 : 8.8) : props.variant === 'studio' ? 7.5 : 6.8)

  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.outputColorSpace = SRGBColorSpace
  renderer.setClearColor(0x000000, 0)
  canvasHost.value.appendChild(renderer.domElement)

  ambientPlane = createAmbientPlane()
  particleField = createParticleField()
  scene.add(ambientPlane, particleField)

  cardGroups = props.cards.map((card, index) => {
    const group = createCardGroup(card, index)
    scene.add(group)
    return group
  })

  resize()
  updateScrollTarget()
  cardGroups.forEach((group, index) => updateCardGroup(group, index, 0))
  renderer.render(scene, camera)
}

const updateMode = () => {
  const nextFallback = shouldUseFallback()
  fallbackActive.value = nextFallback

  if (nextFallback) {
    disposeWebgl()
    return
  }

  initScene()
  resize()
  startRenderLoop()
}

const handleResize = () => {
  const wasFallback = fallbackActive.value
  const nextFallback = shouldUseFallback()

  if (wasFallback !== nextFallback) {
    updateMode()
    return
  }

  resize()
}

const handleReducedMotionChange = (event) => {
  reducedMotion = event.matches
  updateMode()
}

onMounted(() => {
  if (!root.value) return

  isDestroyed = false
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = reducedMotionQuery.matches
  fallbackActive.value = shouldUseFallback()

  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(root.value)

  visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = Boolean(entry?.isIntersecting)

    if (isVisible) {
      startRenderLoop()
    } else {
      stopRenderLoop()
    }
  }, { threshold: 0.01 })
  visibilityObserver.observe(root.value)

  window.addEventListener('resize', handleResize)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
  reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

  updateMode()
})

onUnmounted(() => {
  isDestroyed = true
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  reducedMotionQuery?.removeEventListener('change', handleReducedMotionChange)
  disposeWebgl()
})
</script>

<template>
  <div
    ref="root"
    class="three-card-universe"
    :class="[`three-card-universe--${variant}`, `three-card-universe--${layout}`, { 'is-fallback': fallbackActive }]"
    :style="{ '--three-universe-opacity': intensity }"
  >
    <div ref="canvasHost" class="three-canvas-host" aria-hidden="true"></div>

    <div v-if="fallbackActive" class="fallback-card-stage" aria-hidden="true">
      <article
        v-for="(card, index) in cards"
        :key="card.id || card.title"
        class="fallback-card"
        :style="{ '--fallback-accent': getCardAccent(card, index) }"
      >
        <img
          v-if="mediaTextures[index]?.src"
          :src="mediaTextures[index].src"
          :alt="mediaTextures[index].alt || ''"
        />
        <div class="fallback-card__shade"></div>
        <div class="fallback-card__header">
          <span>{{ card.title }}</span>
          <span>{{ card.number }}</span>
        </div>
        <p>{{ card.summary }}</p>
        <div class="fallback-card__items">
          <span v-for="item in card.items" :key="item">{{ item }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.three-card-universe {
  position: relative;
  width: 100%;
  min-height: min(74svh, 48rem);
  overflow: hidden;
  pointer-events: none;
  opacity: var(--three-universe-opacity, 0.9);
  contain: layout paint style;
}

.three-card-universe--page-stage {
  position: absolute;
  inset: 0;
  height: 100%;
  min-height: 100%;
  overflow: visible;
  contain: layout style;
}

.three-card-universe--studio {
  min-height: min(66svh, 42rem);
}

.three-card-universe--studio.three-card-universe--page-stage {
  min-height: 100%;
}

.three-canvas-host {
  position: absolute;
  inset: 0;
  height: 100%;
}

.three-card-universe--page-stage .three-canvas-host {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
}

.three-card-universe :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.fallback-card-stage {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);
  width: min(56rem, 100%);
  margin: auto;
  padding: clamp(1rem, 3vw, 2rem);
}

.fallback-card {
  position: relative;
  display: flex;
  min-height: 20rem;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 1rem;
  border: 1px solid rgba(245, 241, 232, 0.16);
  border-radius: 8px;
  background: #11110f;
  color: var(--light);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.28);
}

.fallback-card::before {
  content: "";
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  width: 5rem;
  height: 0.35rem;
  background: var(--fallback-accent);
}

.fallback-card img,
.fallback-card__shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.fallback-card img {
  object-fit: cover;
  filter: saturate(0.82) contrast(1.05);
}

.fallback-card__shade {
  background:
    linear-gradient(180deg, rgba(8, 8, 7, 0.18), rgba(8, 8, 7, 0.82)),
    radial-gradient(circle at 24% 18%, color-mix(in srgb, var(--fallback-accent), transparent 72%), transparent 42%);
}

.fallback-card__header,
.fallback-card p,
.fallback-card__items {
  position: relative;
  z-index: 2;
}

.fallback-card__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.8rem;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.fallback-card p {
  margin: 4rem 0 1rem;
  color: rgba(245, 241, 232, 0.78);
  font-size: 0.95rem;
  line-height: 1.45;
}

.fallback-card__items {
  display: grid;
  gap: 0.45rem;
}

.fallback-card__items span {
  display: block;
  padding: 0.45rem 0.55rem;
  border: 1px solid rgba(245, 241, 232, 0.12);
  border-radius: 4px;
  background: rgba(245, 241, 232, 0.08);
  color: rgba(245, 241, 232, 0.86);
  font-size: 0.78rem;
  font-weight: 700;
}

@media (max-width: 859px) {
  .three-card-universe,
  .three-card-universe--studio {
    min-height: auto;
  }

  .three-card-universe--page-stage {
    position: relative;
    inset: auto;
    height: auto;
    min-height: auto;
  }

  .three-canvas-host {
    display: none;
  }

  .fallback-card-stage {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .fallback-card {
    min-height: 15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .three-card-universe {
    opacity: calc(var(--three-universe-opacity, 0.9) * 0.88);
  }
}
</style>
