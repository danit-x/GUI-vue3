import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useDarkMode } from './composables/useDarkMode'
import { getStoredTokenExpiry, useAuthStore } from './stores/authStore'
import './assets/tailwind.css'

useDarkMode()

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore(pinia)
const tokenExpiry = getStoredTokenExpiry()

if (authStore.token && (!tokenExpiry || tokenExpiry <= Date.now())) {
  authStore.logout()
}

app.use(router)

app.mount('#app')
