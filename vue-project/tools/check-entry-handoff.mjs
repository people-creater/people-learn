import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const entryPath = resolve(root, 'src', 'Component', 'EntryVectorIntro.vue')
const navigationPath = resolve(root, 'src', 'Component', 'Navigation.vue')
const appPath = resolve(root, 'src', 'App.vue')

const entry = readFileSync(entryPath, 'utf8')
const navigation = readFileSync(navigationPath, 'utf8')
const app = readFileSync(appPath, 'utf8')

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

assert(navigation.includes('data-logo-target'), 'Navigation logo should expose a stable handoff target')
assert(entry.includes('runLogoHandoff'), 'Entry intro should have a dedicated logo handoff phase')
assert(entry.includes('[data-logo-target]'), 'Entry handoff should measure the real navigation logo target')
assert(entry.includes('getBoundingClientRect'), 'Entry handoff should calculate screen-space movement')
assert(entry.includes('intro-logo-handoff'), 'Entry intro should render a moving logo handoff layer')
assert(entry.includes('entry-intro-handoff'), 'Entry intro should mark the page during handoff')
assert(entry.includes('--intro-bg-alpha'), 'Entry intro background should fade to reveal the home page')
assert(app.includes('body.entry-intro-active .navigation .logo'), 'App should hide the real navigation logo while the intro is active')

console.log('Entry handoff checks passed')
