import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = (...parts) => readFileSync(resolve(root, ...parts), 'utf8')

const app = read('src', 'App.vue')
const nav = read('src', 'Component', 'Navigation.vue')
const home = read('src', 'views', 'Home.vue')
const studio = read('src', 'views', 'About.vue')
const work = read('src', 'views', 'Portfolio.vue')
const notes = read('src', 'views', 'Blog.vue')
const start = read('src', 'views', 'Contact.vue')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

for (const [name, file] of [
  ['Home', home],
  ['Studio', studio],
  ['Work', work],
  ['Notes', notes],
  ['Start', start],
]) {
  assert(file.includes('GridParticleBackground'), `${name} should include the shared grid particle background`)
  assert(file.includes('dark-stage-page'), `${name} should use the shared dark stage page class`)
  assert(file.includes('dark-stage-hero'), `${name} should use the shared dark stage hero class`)
  assert(file.includes('content-panel'), `${name} should use translucent content panels`)
  assert(!file.includes('background: var(--light);'), `${name} should not use old light page backgrounds`)
  assert(!file.includes('background: var(--light2);'), `${name} should not use old light secondary backgrounds`)
  assert(!file.includes('border-radius: 1rem'), `${name} should avoid old rounded-card template styling`)
}

assert(app.includes('background: var(--dark)'), 'Global body should use dark background')
assert(app.includes('color: var(--light)'), 'Global body should use light text')
assert(nav.includes('rgba(8, 8, 7'), 'Navigation should use dark translucent glass')
assert(nav.includes('color: var(--light)'), 'Navigation links should use light text')

assert(work.includes('Selected Work') && work.includes('Systems') && work.includes('Proof') && work.includes('Detail'), 'WORK should use the planned chapter language')
assert(notes.includes('Thinking') && notes.includes('Motion') && notes.includes('Interface') && notes.includes('Delivery'), 'NOTES should use the planned chapter language')
assert(start.includes('Brief') && start.includes('Fit') && start.includes('Contact') && start.includes('Next Step'), 'START should use the planned chapter language')

console.log('Dark stage site checks passed')
