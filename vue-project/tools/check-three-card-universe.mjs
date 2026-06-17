import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const packagePath = resolve(root, 'package.json')
const viteConfigPath = resolve(root, 'vite.config.js')
const homePath = resolve(root, 'src', 'views', 'Home.vue')
const aboutPath = resolve(root, 'src', 'views', 'About.vue')
const componentPath = resolve(root, 'src', 'Component', 'ThreeCardUniverse.vue')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
const viteConfig = readFileSync(viteConfigPath, 'utf8')
const home = readFileSync(homePath, 'utf8')
const about = readFileSync(aboutPath, 'utf8')

assert(packageJson.dependencies?.three, 'package.json should include the three dependency')
assert(viteConfig.includes('chunkSizeWarningLimit: 550'), 'Vite should define a 550k warning budget for the lazy Three.js scene chunk')
assert(existsSync(componentPath), 'ThreeCardUniverse.vue should exist')

const component = readFileSync(componentPath, 'utf8')

const componentChecks = [
  ["from 'three", 'component should import from the Three.js package'],
  ['WebGLRenderer', 'component should create a WebGLRenderer'],
  ['PerspectiveCamera', 'component should create a PerspectiveCamera'],
  ['CanvasTexture', 'component should use canvas textures for card faces'],
  ['PlaneGeometry', 'component should use plane geometry for cards'],
  ['requestAnimationFrame', 'component should run a render loop'],
  ['cancelAnimationFrame', 'component should cancel the render loop'],
  ['startRenderLoop', 'component should expose an explicit render-loop start gate'],
  ['stopRenderLoop', 'component should expose an explicit render-loop stop gate'],
  ['IntersectionObserver', 'component should pause the scene when it is out of view'],
  ['visibilitychange', 'component should pause the render loop when the document is hidden'],
  ['variant:', 'component should accept a hero/studio variant prop'],
  ['quality:', 'component should accept a full/fallback quality prop'],
  ['mediaTextures:', 'component should accept media textures for card backs and stage texture'],
  ['pageStage', 'component should support a page-level stage mode'],
  ['document.documentElement.scrollHeight', 'component should calculate animation progress from full-page scroll height'],
  ['window.scrollY', 'component should use window scrollY for full-page stage progress'],
  ['height: 100%', 'component should allow the canvas to fill a page-height parent'],
  ['min-height: 100%', 'component should not rely on a local viewport-height card box in page-stage mode'],
  ['fallbackActive', 'component should expose a reactive fallback state'],
  ['shouldUseFallback', 'component should decide when to use the mobile/reduced-motion fallback'],
  ['fallback-card-stage', 'component should render a static card fallback'],
  ['createMediaTexture', 'component should create card texture maps from image media'],
  ['onMounted', 'component should initialize after Vue mount'],
  ['onUnmounted', 'component should clean up on unmount'],
  ['dispose', 'component should dispose Three.js resources'],
  ['prefers-reduced-motion', 'component should respect reduced motion'],
  ['three-card-universe', 'component should expose the expected root class'],
]

for (const [needle, message] of componentChecks) {
  assert(component.includes(needle), message)
}

const homeChecks = [
  ['ThreeCardUniverse', 'Home.vue should import and render ThreeCardUniverse'],
  ['capabilityCards', 'Home.vue should define the shared capability card data'],
  ['mediaTextures', 'Home.vue should define media texture data'],
  ['home-three-universe', 'Home.vue should include the 3D universe layer class'],
  ['page-three-stage', 'Home.vue should render ThreeCardUniverse in a page-level stage layer'],
  ['page-stage', 'Home.vue should request the page-level ThreeCardUniverse layout'],
  ['variant="hero"', 'Home.vue should render the hero variant of ThreeCardUniverse'],
  ['quality="full"', 'Home.vue should request the desktop/full quality scene'],
  [':media-textures="mediaTextures"', 'Home.vue should pass image textures into the 3D scene'],
  ['aria-hidden="true"', '3D background layer should be hidden from assistive tech'],
]

for (const [needle, message] of homeChecks) {
  assert(home.includes(needle), message)
}

const aboutChecks = [
  ['ThreeCardUniverse', 'About.vue should import and render ThreeCardUniverse'],
  ['studioThreeCards', 'About.vue should define the STUDIO 3D card data'],
  ['mediaTextures', 'About.vue should define media texture data'],
  ['studio-three-universe', 'About.vue should include the STUDIO 3D universe layer class'],
  ['page-three-stage', 'About.vue should render ThreeCardUniverse in a page-level stage layer'],
  ['page-stage', 'About.vue should request the page-level ThreeCardUniverse layout'],
  ['variant="studio"', 'About.vue should render the studio variant of ThreeCardUniverse'],
  [':media-textures="mediaTextures"', 'About.vue should pass image textures into the 3D scene'],
  ['aria-hidden="true"', 'STUDIO 3D background layer should be hidden from assistive tech'],
]

for (const [needle, message] of aboutChecks) {
  assert(about.includes(needle), message)
}

const retiredHomePatterns = [
  ['stage-visual', 'Home.vue should not keep a boxed local 3D stage container'],
  ['heroCards', 'Home.vue should not keep the old desktop 2D hero cards'],
  ['image-runway', 'Home.vue should not keep the independent four-image runway'],
  ['runway-frame', 'Home.vue should not keep runway frame markup or motion'],
  ['setupScrollReactiveFrames', 'Home.vue should not keep the old runway scroll animation'],
  ['cards-container', 'Home.vue should not keep the fixed 2D service-card overlay'],
  ['flip-card-inner', 'Home.vue should not keep the old 2D flip card system'],
]

for (const [needle, message] of retiredHomePatterns) {
  assert(!home.includes(needle), message)
}

const retiredStudioPatterns = [
  ['studio-three-shell', 'About.vue should not keep a boxed local 3D stage container'],
  ['studio-hero-stack', 'About.vue should not keep the old 2D hero card stack'],
  ['studio-card-lab', 'About.vue should not keep the old pinned 2D card lab'],
  ['studio-pin-card', 'About.vue should not keep pinned 2D flip cards'],
  ['flip-card-inner', 'About.vue should not keep the old 2D flip-card markup'],
]

for (const [needle, message] of retiredStudioPatterns) {
  assert(!about.includes(needle), message)
}

assert(!component.includes('markers: true'), 'Three.js integration should not leave ScrollTrigger markers enabled')

console.log('Three card universe checks passed')
