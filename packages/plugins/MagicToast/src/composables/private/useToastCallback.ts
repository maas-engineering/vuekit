import { ref, toValue, type Ref, type MaybeRef } from 'vue'
import { useMagicEmitter } from '@maas/vue-equipment/plugins'
import type { ActiveToast, ToastOptions, Toast } from './../../types'

type UseToastCallbackArgs = {
  id: MaybeRef<string>
  mappedOptions: ToastOptions
  count: Ref<number | undefined>
  firstToast: Ref<Toast | undefined>
}

export function useToastCallback(args: UseToastCallbackArgs) {
  const { id, mappedOptions, count, firstToast } = args

  const activeToasts = ref<ActiveToast[]>([])
  const emitter = useMagicEmitter()

  function onBeforeEnter(_el: Element) {
    emitter.emit('beforeEnter', toValue(id))
  }

  function onEnter(_el: Element) {
    emitter.emit('enter', toValue(id))
    if (
      count.value &&
      mappedOptions.layout?.max &&
      count.value > mappedOptions.layout.max
    ) {
      firstToast.value?.remove()
    }
  }

  function onAfterEnter(el: Element) {
    emitter.emit('afterEnter', toValue(id))

    const mappedEl = el as HTMLElement
    const style = window.getComputedStyle(mappedEl)

    activeToasts.value = [
      ...activeToasts.value,
      {
        id: el.id,
        height: mappedEl.offsetHeight,
        padding: {
          top: parseInt(style.paddingTop),
          bottom: parseInt(style.paddingBottom),
        },
      },
    ]
  }

  function onBeforeLeave(_el: Element) {
    emitter.emit('beforeLeave', toValue(id))
  }

  function onLeave(el: Element) {
    emitter.emit('leave', toValue(id))
    activeToasts.value = activeToasts.value.filter((item) => item.id !== el.id)
  }

  function onAfterLeave(_el: Element) {
    emitter.emit('afterLeave', toValue(id))
  }

  return {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    activeToasts,
  }
}
