import type { Options } from '../types/index'

const defaultOptions: Options = {
  teleport: {
    target: 'body',
    disabled: false,
  },
  transitions: {
    list: 'magic-toast--list',
  },
  layout: {
    stack: true,
    max: 3,
  },
}

export { defaultOptions }
