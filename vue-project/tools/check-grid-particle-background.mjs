import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const componentPath = resolve(root, 'src', 'Component', 'GridParticleBackground.vue')
const component = readFileSync(componentPath, 'utf8')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

assert(component.includes('requestAnimationFrame'), 'Grid background should use requestAnimationFrame')
assert(component.includes('cancelAnimationFrame'), 'Grid background should cancel RAF on cleanup')
assert(component.includes('prefers-reduced-motion'), 'Grid background should respect reduced-motion preferences')
assert(component.includes('IntersectionObserver'), 'Grid background should pause when off-screen')
assert(component.includes('visibilitychange'), 'Grid background should pause when document visibility changes')
assert(component.includes('pointermove'), 'Grid background should react to pointer movement on desktop')
assert(component.includes('window.innerWidth < 860'), 'Grid background should use mobile fallback below desktop breakpoint')
assert(component.includes('canvas'), 'Grid background should render through canvas')
assert(component.includes('magnetic'), 'Grid background should encode the Magnetic Field interaction')
assert(component.includes('onUnmounted'), 'Grid background should clean up on unmount')

console.log('Grid particle background checks passed')
