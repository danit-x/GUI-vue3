import { readonly, ref } from "vue"

interface Toast {
  id: number
  message: string
}

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  function showToast(message: string, duration = 2200) {
    const id = ++toastId

    toasts.value = [...toasts.value, { id, message }]

    window.setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id)
    }, duration)
  }

  function dismissToast(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts: readonly(toasts),
    showToast,
    dismissToast
  }
}
