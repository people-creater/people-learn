import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const studioPath = resolve(root, 'src', 'views', 'About.vue')
const studio = readFileSync(studioPath, 'utf8')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

assert(studio.includes('studioCards'), 'Studio page should define local studioCards data')
assert(studio.includes('Strategy') && studio.includes('Interface') && studio.includes('Delivery'), 'Studio page should reuse INDEX capability card language')
assert(studio.includes('StudioThreeCardUniverse'), 'Studio page should render the shared ThreeCardUniverse scene')
assert(studio.includes('variant="studio"'), 'Studio page should use the studio Three.js variant')
assert(studio.includes('layout="page-stage"'), 'Studio page should request page-level Three.js layout')
assert(studio.includes('page-three-stage'), 'Studio page should mount the Three.js scene as a page-level layer')
assert(studio.includes(':media-textures="mediaTextures"'), 'Studio page should pass image textures into the shared card system')
assert(studio.includes('gsap.context'), 'Studio page should scope GSAP animations with gsap.context')
assert(studio.includes('onUnmounted'), 'Studio page should clean up animations on unmount')
assert(studio.includes('ScrollTrigger'), 'Studio page should use ScrollTrigger for lightweight reveal animation')
assert(studio.includes('prefers-reduced-motion'), 'Studio page should respect reduced-motion preferences')
assert(studio.includes('studio-method'), 'Studio page should include a studio method section that extends the 3D hero')
assert(studio.includes('method-grid'), 'Studio page should use a lightweight method grid instead of a second 2D card stack')
assert(studio.includes('content-panel'), 'Studio content sections should use translucent panels over the full-page 3D stage')
assert(studio.includes('process-runway') && studio.includes('toolkit-grid') && studio.includes('outcome-grid'), 'Studio page should include process, toolkit, and outcomes sections')
assert(!studio.includes('About Me'), 'Studio page should remove generic About Me hero copy')
assert(!studio.includes('Skills & Technologies'), 'Studio page should remove generic skills section title')
assert(!studio.includes('My Journey'), 'Studio page should remove generic timeline section title')
assert(!studio.includes('studio-three-shell'), 'Studio page should remove the old boxed 3D stage container')
assert(!studio.includes('studio-hero-stack'), 'Studio page should remove the old 2D hero card stack')
assert(!studio.includes('studio-card-lab'), 'Studio page should remove the old pinned 2D card lab')
assert(!studio.includes('studio-pin-card'), 'Studio page should remove old pinned 2D cards')
assert(!studio.includes('flip-card-inner'), 'Studio page should remove old 2D flip-card markup')
assert(!studio.includes('markers: true'), 'Studio page should not ship ScrollTrigger markers')

console.log('Studio page checks passed')
