import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const homePath = resolve(root, 'src', 'views', 'Home.vue')
const home = readFileSync(homePath, 'utf8')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

assert(home.includes('ref="homeRoot"'), 'Home page should expose a scoped root ref')
assert(home.includes('gsap.quickTo'), 'Home page should use GSAP quickTo for pointer-reactive background variables')
assert(home.includes('prefers-reduced-motion'), 'Home page should respect reduced-motion preferences')
assert(home.includes('ThreeCardUniverse'), 'Home page should use ThreeCardUniverse as the primary visual')
assert(home.includes('capabilityCards'), 'Home page should use Strategy/Interface/Delivery as the card data')
assert(home.includes('mediaTextures'), 'Home page should map image assets into card textures')
assert(home.includes('variant="hero"'), 'Home page should render the hero Three.js variant')
assert(home.includes('layout="page-stage"'), 'Home page should request page-level Three.js layout')
assert(home.includes('page-three-stage'), 'Home page should mount the Three.js scene as a page-level layer')
assert(home.includes(':media-textures="mediaTextures"'), 'Home page should pass media textures into the card system')
assert(home.includes('dark-stage-page'), 'Home page should use the shared dark stage page class')
assert(home.includes('dark-stage-hero'), 'Home page should use the shared dark stage hero class')
assert(home.includes('stage-metric'), 'Home hero should summarize the three cards without duplicating the card UI')
assert(home.includes('capability-runway'), 'Home page should carry the card story into a lightweight content section')
assert(home.includes('capability-list'), 'Home page should use a text/list continuation instead of a second card overlay')
assert(home.includes('scrollTrigger'), 'Home page should keep lightweight ScrollTrigger reveals for content')
assert(home.includes('content-panel'), 'Home content sections should use translucent panels over the full-page 3D stage')
assert(home.includes('--bg-x') && home.includes('--bg-y'), 'Home page should define pointer background coordinates')
assert(home.includes('radial-gradient'), 'Home background should use gradient color fields')
assert(home.includes('pointermove'), 'Home page should respond to pointer movement')
assert(!home.includes('heroCards'), 'Home page should remove the old desktop heroCards data')
assert(!home.includes('stage-visual'), 'Home page should remove the old boxed 3D stage container')
assert(!home.includes('image-runway'), 'Home page should remove the old independent image runway')
assert(!home.includes('runway-frame'), 'Home page should remove old runway frame markup/styles')
assert(!home.includes('setupScrollReactiveFrames'), 'Home page should remove old runway-specific motion code')
assert(!home.includes('cards-container'), 'Home page should remove the old fixed service-card overlay')
assert(!home.includes('flip-card-inner'), 'Home page should remove the old 2D flip-card system')

console.log('Home motion checks passed')
