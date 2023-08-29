import { ref } from 'vue'
import { useToastInternalApi } from './useToastInternalApi'
import type { ToastInstance, AddArgs } from '../types/index'

const toastStore = ref<ToastInstance[]>([])

export function useToastStore() {
  // Private methods
  const { addToast } = useToastInternalApi()

  function createInstance(id: string): ToastInstance {
    const instance: ToastInstance = {
      id: id,
      toasts: [],
      add: function (args: AddArgs) {
        return addToast(args, this)
      },
      remove: function (id: string) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id)
      },
    }
    return instance
  }

  // Public methods
  function findInstance(id: string) {
    return toastStore.value.find(
      (instance: ToastInstance) => instance.id === id,
    )
  }

  function addInstance(id: string) {
    const instance = createInstance(id)
    toastStore.value.push(instance)
    return instance
  }

  function removeInstance(id: string) {
    toastStore.value = toastStore.value.filter(
      (instance: ToastInstance) => instance.id !== id,
    )
  }

  return {
    toastStore,
    findInstance,
    addInstance,
    removeInstance,
  }
}
