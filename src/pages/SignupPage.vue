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
  <div class="max-w-md mx-auto py-20">
    <h1 class="mb-6 text-center text-3xl font-bold">
      Create Your VYBE Account
    </h1>

    <div v-if="error" class="mb-4 rounded bg-red-900 p-3 text-red-200">
      {{ error }}
    </div>

    <div class="space-y-4">
      <input
        v-model="form.firstName"
        placeholder="First name"
        class="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
        :disabled="loading"
      />

      <input
        v-model="form.lastName"
        placeholder="Last name"
        class="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
        :disabled="loading"
      />

      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
        :disabled="loading"
      />

      <input
        v-model="form.username"
        placeholder="Username"
        class="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
        :disabled="loading"
      />

      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        class="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
        :disabled="loading"
      />

      <button
        @click="handleSignup"
        :disabled="loading"
        class="w-full rounded bg-purple-600 py-3 hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? "Creating account..." : "Sign Up" }}
      </button>
    </div>

    <p class="mt-6 text-center text-sm text-zinc-400">
      Already have an account?
      <RouterLink to="/login" class="text-purple-400 hover:text-purple-300">
        Log in
      </RouterLink>
    </p>
  </div>
</template>
