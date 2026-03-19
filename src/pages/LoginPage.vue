<script setup lang="ts">
import { ref } from "vue"
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

async function handleLogin() {
  error.value = ""
  loading.value = true

  try {
    const data = await login(username.value, password.value)

    auth.setAuth({
      token: data.accessToken || data.token || "",
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image
      }
    })

    router.push("/products")
  } catch (err) {
    error.value = "Login failed. Please try again."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-[0.95fr_1.05fr]">
    <div class="vybe-reveal vybe-panel rounded-[2.25rem] p-8" style="--delay: 80ms;">
      <p class="text-xs uppercase tracking-[0.4em] text-[color:var(--muted)]">
        Returning collector
      </p>
      <h1 class="vybe-display mt-4 text-5xl leading-none">
        Step back into the archive.
      </h1>
      <p class="mt-6 text-sm leading-7 text-[color:var(--muted)]">
        Sign in to keep your saved pieces, cart, and browsing ritual intact across sessions.
      </p>
    </div>

    <div class="vybe-reveal vybe-panel rounded-[2.25rem] p-6 sm:p-8" style="--delay: 180ms;">
      <h2 class="vybe-display text-4xl">
        Log In
      </h2>

      <div v-if="signupSuccess" class="mt-6 rounded-[1.5rem] border border-emerald-600/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
        Signup completed. Use your credentials to log in.
      </div>

      <div v-if="error" class="mt-6 rounded-[1.5rem] border border-red-600/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
        {{ error }}
      </div>

      <div class="mt-6 space-y-4">
        <input
          v-model="username"
          placeholder="Username"
          class="vybe-input w-full rounded-[1.25rem] px-4 py-4"
          :disabled="loading"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="vybe-input w-full rounded-[1.25rem] px-4 py-4"
          :disabled="loading"
        />

        <button
          @click="handleLogin"
          :disabled="loading"
          class="vybe-button w-full rounded-full px-5 py-4 text-xs uppercase tracking-[0.22em]"
        >
          {{ loading ? "Logging In..." : "Log In" }}
        </button>
      </div>

      <p class="mt-6 text-sm text-[color:var(--muted)]">
        Need an account?
        <RouterLink to="/signup" class="text-[color:var(--accent)] transition hover:opacity-80">
          Join the collection
        </RouterLink>
      </p>
    </div>
  </section>
</template>
