<script setup lang="ts">
import { reactive, ref } from "vue"
import { RouterLink, useRouter } from "vue-router"
import { signup } from "../services/authService"

const router = useRouter()

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: ""
})

const error = ref("")
const loading = ref(false)

async function handleSignup() {
  error.value = ""
  loading.value = true

  try {
    await signup({ ...form })
    router.push({ path: "/login", query: { signup: "success" } })
  } catch (err) {
    error.value = "Signup failed. Please try again."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-[1.02fr_0.98fr]">
    <div class="vybe-reveal vybe-panel rounded-[2.25rem] p-8" style="--delay: 80ms;">
      <p class="text-xs uppercase tracking-[0.4em] text-[color:var(--muted)]">
        New arrival
      </p>
      <h1 class="vybe-display mt-4 text-5xl leading-none">
        Create your member card.
      </h1>
      <p class="mt-6 text-sm leading-7 text-[color:var(--muted)]">
        Join VYBE to bookmark finds, hold a cart between visits, and move through the storefront like it remembers your taste.
      </p>
    </div>

    <div class="vybe-reveal vybe-panel rounded-[2.25rem] p-6 sm:p-8" style="--delay: 180ms;">
      <h2 class="vybe-display text-4xl">
        Sign Up
      </h2>

      <div v-if="error" class="mt-6 rounded-[1.5rem] border border-red-600/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
        {{ error }}
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          v-model="form.firstName"
          placeholder="First name"
          class="vybe-input rounded-[1.25rem] px-4 py-4"
          :disabled="loading"
        />

        <input
          v-model="form.lastName"
          placeholder="Last name"
          class="vybe-input rounded-[1.25rem] px-4 py-4"
          :disabled="loading"
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="vybe-input rounded-[1.25rem] px-4 py-4 sm:col-span-2"
          :disabled="loading"
        />

        <input
          v-model="form.username"
          placeholder="Username"
          class="vybe-input rounded-[1.25rem] px-4 py-4 sm:col-span-2"
          :disabled="loading"
        />

        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="vybe-input rounded-[1.25rem] px-4 py-4 sm:col-span-2"
          :disabled="loading"
        />
      </div>

      <button
        @click="handleSignup"
        :disabled="loading"
        class="vybe-button mt-6 w-full rounded-full px-5 py-4 text-xs uppercase tracking-[0.22em]"
      >
        {{ loading ? "Creating Account..." : "Create Account" }}
      </button>

      <p class="mt-6 text-sm text-[color:var(--muted)]">
        Already have an account?
        <RouterLink to="/login" class="text-[color:var(--accent)] transition hover:opacity-80">
          Log in
        </RouterLink>
      </p>
    </div>
  </section>
</template>
