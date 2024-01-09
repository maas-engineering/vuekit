export type DrawerOptions = {
  position?: 'top' | 'right' | 'bottom' | 'left'
  backdrop?: boolean
  focusTrap?: boolean
  scrollLock?: boolean
  scrollLockPadding?: boolean
  teleport?: {
    target?: string
    disabled?: boolean
  }
  transitions?: {
    content?: string
    backdrop?: string
  }
  threshold: {
    distance: number
    momentum: number
  }
  tag?: 'dialog' | 'div'
  keys?: string[] | false
}

export type DrawerEvents = {
  beforeEnter: string
  enter: string
  afterEnter: string
  beforeLeave: string
  leave: string
  afterLeave: string
}
