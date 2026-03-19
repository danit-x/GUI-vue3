import { ref } from "vue"

const isDark = ref(false)
let initialized = false
const THEME_KEY = "theme"

function initDarkMode() {
  if (initialized) return

  const savedTheme = localStorage.getItem(THEME_KEY)
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

  function setDarkMode(value: boolean) {
    isDark.value = value
    document.documentElement.classList.toggle("dark", value)
    localStorage.setItem(THEME_KEY, value ? "dark" : "light")
  }

  function toggleDark() {
    setDarkMode(!isDark.value)
  }

  return {
    isDark,
    setDarkMode,
    toggleDark
  }
}
