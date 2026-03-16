import { ref } from "vue"

const isDark = ref(false)
let initialized = false

function initDarkMode() {
  if (initialized) return

  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    isDark.value = true
    document.documentElement.classList.add("dark")
  } else {
    isDark.value = false
    document.documentElement.classList.remove("dark")
  }

  initialized = true
}

export function useDarkMode() {
  initDarkMode()

  function toggleDark() {
    isDark.value = !isDark.value

    if (isDark.value) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return {
    isDark,
    toggleDark
  }
}