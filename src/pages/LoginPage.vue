<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { login } from "../services/authService"
import { useAuthStore } from "../stores/authStore"
import { RouterLink, useRoute, useRouter } from "vue-router"

const username = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const signupSuccess = route.query.signup === "success"
const redirectTarget = typeof route.query.redirect === "string" ? route.query.redirect : "/products"
const touched = reactive({
  username: false,
  password: false
})

const usernameError = computed(() => {
  if (!username.value.trim()) {
    return "Username is required."
  }

  return ""
})

const passwordError = computed(() => {
  if (password.value.length < 6) {
    return "Password must be at least 6 characters."
  }

  return ""
})

const isFormValid = computed(() => !usernameError.value && !passwordError.value)

function handleBlur(field: keyof typeof touched) {
  touched[field] = true
}

async function handleLogin() {
  touched.username = true
  touched.password = true

  if (!isFormValid.value) {
    return
  }

  error.value = ""
  loading.value = true

  try {
    const data = await login(username.value, password.value)

    auth.setAuth({
      token: data.accessToken || data.token || "",
      expiresAt: Date.now() + 30 * 60 * 1000,
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image
      }
    })

    router.push(redirectTarget)
  } catch {
    error.value = "Login failed. Please try again."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="vybe-page grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[0.95fr_1.05fr]">
    <div class="vybe-reveal vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8" style="--delay: 80ms;">
      <p class="vybe-kicker text-[10px] sm:text-[11px]">
        Returning collector
      </p>
      <h1 class="vybe-display mt-3 text-[clamp(2.5rem,7vw,5rem)] leading-[0.94] sm:mt-4">
        Step back into the archive.
      </h1>
      <p class="mt-3 sm:mt-4 md:mt-6 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
        Sign in to keep your saved pieces, cart, and browsing ritual intact across sessions.
      </p>
    </div>

    <div class="vybe-reveal vybe-panel rounded-[2.4rem] p-5 sm:p-6 md:p-8" style="--delay: 180ms;">
      <h2 class="vybe-display text-2xl sm:text-3xl md:text-4xl">
        Log In
      </h2>

      <div v-if="signupSuccess" class="mt-4 sm:mt-6 rounded-[1.5rem] border border-emerald-600/30 bg-emerald-500/10 p-3 sm:p-4 text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
        Signup completed. Use your credentials to log in.
      </div>

      <div v-if="error" class="mt-4 sm:mt-6 rounded-[1.5rem] border border-red-600/30 bg-red-500/10 p-3 sm:p-4 text-xs sm:text-sm text-red-700 dark:text-red-300">
        {{ error }}
      </div>

      <div class="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        <label class="vybe-field">
          <span class="vybe-label text-[10px] sm:text-[11px]">Username</span>
          <input
            v-model="username"
            placeholder="Enter your username"
            class="vybe-input w-full rounded-[1.25rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
            :disabled="loading"
            @blur="handleBlur('username')"
          />
          <p v-if="touched.username && usernameError" class="mt-2 text-xs text-red-600 dark:text-red-300">
            {{ usernameError }}
          </p>
        </label>

        <label class="vybe-field">
          <span class="vybe-label text-[10px] sm:text-[11px]">Password</span>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="vybe-input w-full rounded-[1.25rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
            :disabled="loading"
            @blur="handleBlur('password')"
          />
          <p v-if="touched.password && passwordError" class="mt-2 text-xs text-red-600 dark:text-red-300">
            {{ passwordError }}
          </p>
        </label>

        <button
          @click="handleLogin"
          :disabled="loading || !isFormValid"
          class="vybe-button vybe-touch-target w-full rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] sm:px-5 sm:py-4 sm:text-sm"
        >
          {{ loading ? "Logging In..." : "Log In" }}
        </button>
      </div>

      <p class="mt-4 sm:mt-6 text-xs sm:text-sm text-[color:var(--muted)]">
        Need an account?
        <RouterLink to="/signup" class="text-[color:var(--accent)] transition hover:opacity-80">
          Join the collection
        </RouterLink>
      </p>
    </div>
  </section>
</template>
