import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImports,
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@maas/vue-equipment/MagicPlayer',
  },
  setup() {
    const resolver = createResolver(import.meta.url)
    addComponentsDir({
      path: resolver.resolve('src/components'),
      global: true,
      pathPrefix: false,
      ignore: ['icons/*'],
    })

    addImports({
      from: '@maas/vue-equipment/plugins/MagicPlayer',
      name: 'useProvidePlayer',
    })

    addImports({
      from: '@maas/vue-equipment/plugins/MagicPlayer',
      name: 'useInjectPlayer',
    })

    addImports({
      from: '@maas/vue-equipment/plugins/MagicPlayer',
      name: 'useProvideControls',
    })

    addImports({
      from: '@maas/vue-equipment/plugins/MagicPlayer',
      name: 'useInjectControls',
    })
  },
})
