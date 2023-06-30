import { ref, inject, computed } from 'vue'
import { toValue } from '@vueuse/shared'
import { WindowDimensionsKey, WindowScrollKey } from '../types'
import { clampValue } from '../utils'

import type { MaybeRef } from '@vueuse/shared'
import type { FromTo } from '../types'

export function useProgress(
  target: MaybeRef<HTMLElement | null | undefined>,
  from: FromTo,
  to: FromTo
) {
  const dimensions = inject(WindowDimensionsKey, { vw: ref(0), vh: ref(0) })
  const scrollPosition = inject(WindowScrollKey, { x: 0, y: 0 })

  const offsetY = computed(() => scrollPosition.y)

  const targetRect = ref()
  const start = ref(0)
  const end = ref(0)

  const splitLocation = (location: string) => {
    return {
      el: location.match(/^[a-z]+/)![0],
      vp: location.match(/[a-z]+$/)![0],
    }
  }

  const getOffsetTop = (points: { el: string; vp: string }) => {
    let y = 0

    switch (points.el) {
      case 'top':
        y += targetRect.value.top + offsetY.value
        break
      case 'center':
        y += targetRect.value.top + offsetY.value + targetRect.value.height / 2
        break
      case 'bottom':
        y += targetRect.value.top + offsetY.value + targetRect.value.height
        break
    }

    switch (points.vp) {
      case 'top':
        y -= 0
        break
      case 'center':
        y -= dimensions.vh.value / 2
        break
      case 'bottom':
        y -= dimensions.vh.value
        break
      case 'initial':
        y -= targetRect.value.top + offsetY.value
        break
    }

    return y
  }

  const getCalculations = () => {
    targetRect.value = toValue(target)?.getBoundingClientRect()
    start.value = getOffsetTop(splitLocation(from))
    end.value = getOffsetTop(splitLocation(to))
  }

  const getProgress = () => {
    const total = Math.abs(end.value - start.value)
    const current = offsetY.value - start.value

    return clampValue(current / total, 0, 1)
  }

  return { getCalculations, getProgress }
}
