<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { ROUTES } from "../router/routes"
import { RouterLink, useRouter } from "vue-router"
import { signup } from "../services/authService"

const router = useRouter()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: ""
})

const error = ref("")
const loading = ref(false)
const touched = reactive({
  firstName: false,
  lastName: false,
  email: false,
  username: false,
  password: false
})

const fieldErrors = computed(() => ({
  firstName: form.firstName.trim() ? "" : "First name is required.",
  lastName: form.lastName.trim() ? "" : "Last name is required.",
  email: !form.email.trim()
    ? "Email is required."
    : !emailPattern.test(form.email)
      ? "Enter a valid email address."
      : "",
  username: !form.username.trim()
    ? "Username is required."
    : form.username.trim().length < 3
      ? "Username must be at least 3 characters."
      : "",
  password: !form.password
    ? "Password is required."
    : form.password.length < 8
      ? "Password must be at least 8 characters."
      : ""
}))

const isFormValid = computed(() =>
  Object.values(fieldErrors.value).every((fieldError) => !fieldError)
)

function handleBlur(field: keyof typeof touched) {
  touched[field] = true
}

async function handleSignup() {
  touched.firstName = true
  touched.lastName = true
  touched.email = true
  touched.username = true
  touched.password = true

  if (!isFormValid.value) {
    return
  }

  error.value = ""
  loading.value = true

  try {
    await signup({ ...form })
    router.push({ path: ROUTES.login, query: { signup: "success" } })
  } catch {
    error.value = "Signup failed. Please try again."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="vybe-page grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[1.02fr_0.98fr]">
    <div class="vybe-reveal vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8" style="--delay: 80ms;">
      <p class="vybe-kicker text-[10px] sm:text-[11px]">
        New arrival
      </p>
      <h1 class="vybe-display mt-3 text-[clamp(2.5rem,7vw,5rem)] leading-[0.94] sm:mt-4">
        Create your member card.
      </h1>
      <p class="mt-3 sm:mt-4 md:mt-6 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
        Join VYBE to bookmark finds, hold a cart between visits, and move through the storefront like it remembers your taste.
      </p>
    </div>

    <div class="vybe-reveal vybe-panel rounded-[2.4rem] p-5 sm:p-6 md:p-8" style="--delay: 180ms;">
      <h2 class="vybe-display text-2xl sm:text-3xl md:text-4xl">
        Sign Up
      </h2>

      <div v-if="error" class="mt-4 sm:mt-6 rounded-[1.5rem] border border-red-600/30 bg-red-500/10 p-3 sm:p-4 text-xs sm:text-sm text-red-700 dark:text-red-300">
        {{ error }}
      </div>

      <div class="mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
        <label class="vybe-field">
          <span class="vybe-label text-[10px] sm:text-[11px]">First name</span>
          <input
            v-model="form.firstName"
            placeholder="First name"
            class="vybe-input rounded-[1.25rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
            :disabled="loading"
            @blur="handleBlur('firstName')"
          />
          <p v-if="touched.firstName && fieldErrors.firstName" class="mt-2 text-xs text-red-600 dark:text-red-300">
            {{ fieldErrors.firstName }}
          </p>
        </label>

        <label class="vybe-field">
          <span class="vybe-label text-[10px] sm:text-[11px]">Last name</span>
          <input
            v-model="form.lastName"
            placeholder="Last name"
            class="vybe-input rounded-[1.25rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
            :disabled="loading"
            @blur="handleBlur('lastName')"
          />
          <p v-if="touched.lastName && fieldErrors.lastName" class="mt-2 text-xs text-red-600 dark:text-red-300">
            {{ fieldErrors.lastName }}
          </p>
        </label>

        <label class="vybe-field sm:col-span-2">
          <span class="vybe-label text-[10px] sm:text-[11px]">Email</span>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="vybe-input rounded-[1.25rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
            :disabled="loading"
            @blur="handleBlur('email')"
          />
          <p v-if="touched.email && fieldErrors.email" class="mt-2 text-xs text-red-600 dark:text-red-300">
            {{ fieldErrors.email }}
          </p>
        </label>

        <label class="vybe-field sm:col-span-2">
          <span class="vybe-label text-[10px] sm:text-[11px]">Username</span>
          <input
            v-model="form.username"
            placeholder="Username"
            class="vybe-input rounded-[1.25rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
            :disabled="loading"
            @blur="handleBlur('username')"
          />
          <p v-if="touched.username && fieldErrors.username" class="mt-2 text-xs text-red-600 dark:text-red-300">
            {{ fieldErrors.username }}
          </p>
        </label>

        <label class="vybe-field sm:col-span-2">
          <span class="vybe-label text-[10px] sm:text-[11px]">Password</span>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="vybe-input rounded-[1.25rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
            :disabled="loading"
            @blur="handleBlur('password')"
          />
          <p v-if="touched.password && fieldErrors.password" class="mt-2 text-xs text-red-600 dark:text-red-300">
            {{ fieldErrors.password }}
          </p>
        </label>
      </div>

      <button
        @click="handleSignup"
        :disabled="loading || !isFormValid"
        class="vybe-button vybe-touch-target mt-4 w-full rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-5 sm:py-4 sm:text-sm"
      >
        {{ loading ? "Creating Account..." : "Create Account" }}
      </button>

      <p class="mt-4 sm:mt-6 text-xs sm:text-sm text-[color:var(--muted)]">
        Already have an account?
        <RouterLink :to="ROUTES.login" class="text-[color:var(--accent)] transition hover:opacity-80">
          Log in
        </RouterLink>
      </p>
    </div>
  </section>
</template>
