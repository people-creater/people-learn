import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const appPath = resolve(root, 'src', 'App.vue')
const componentPath = resolve(root, 'src', 'Component', 'EntryVectorIntro.vue')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

assert(existsSync(componentPath), 'EntryVectorIntro.vue should exist')

const app = readFileSync(appPath, 'utf8')
const component = readFileSync(componentPath, 'utf8')

assert(app.includes("import EntryVectorIntro from './Component/EntryVectorIntro.vue'"), 'App.vue should import EntryVectorIntro')
assert(app.includes('<EntryVectorIntro'), 'App.vue should render EntryVectorIntro')
assert(component.includes("defineEmits(['complete'])"), 'EntryVectorIntro should emit complete')
assert(component.includes('gsap.context'), 'EntryVectorIntro should scope GSAP animations')
assert(component.includes('prefers-reduced-motion'), 'EntryVectorIntro should respect reduced motion')
assert(component.includes('PEOPLE') && component.includes('LEARN'), 'EntryVectorIntro should assemble PEOPLE LEARN')
assert(component.includes('strokeDashoffset'), 'EntryVectorIntro should animate SVG strokes')

console.log('Entry intro checks passed')
