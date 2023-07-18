import MagicScrollProvider from './src/components/MagicScrollProvider.vue'
import MagicScrollScene from './src/components/MagicScrollScene.vue'
import MagicScrollTransform from './src/components/MagicScrollTransform.vue'
import MagicScrollCollision from './src/components/MagicScrollCollision.vue'

import { magicScrollStore } from './src/store'

import { useEmitter } from './src/composables/useEmitter'
import { useProgress } from './src/composables/useProgress'
import { useCollisionDetect } from './src/composables/useCollisionDetect'

import { StoreKey } from './src/types'

import type { App, Plugin } from 'vue'

export type * from './src/types'

const MagicScroll: Plugin = {
  install: (app: App) => {
    app.component('MagicScrollProvider', MagicScrollProvider)
    app.component('MagicScrollScene', MagicScrollScene)
    app.component('MagicScrollTransform', MagicScrollTransform)
    app.component('MagicScrollCollision', MagicScrollCollision)

    app.provide(StoreKey, magicScrollStore)
  },
}

export { MagicScroll, useEmitter, useProgress, useCollisionDetect }
