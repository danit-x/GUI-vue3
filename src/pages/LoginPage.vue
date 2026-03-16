<script setup lang="ts">
import { ref } from "vue"
import { login } from "../services/authService"
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"

const username = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  error.value = ""
  loading.value = true

  try {
    const data = await login(username.value, password.value)

    auth.setToken(data.token)

    router.push("/products")
  } catch (err) {
    error.value = "Login failed. Please try again."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-20">
    <h1 class="text-3xl font-bold mb-6 text-center">
      Login to VYBE
    </h1>

    <div v-if="error" class="mb-4 p-3 bg-red-900 text-red-200 rounded">
      {{ error }}
    </div>

    <div class="space-y-4">
      <input
        v-model="username"
        placeholder="Username"
        class="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
        :disabled="loading"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
        :disabled="loading"
      />

      <button
        @click="handleLogin"
        :disabled="loading"
        class="w-full bg-purple-600 py-3 rounded hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </div>
  </div>
</template>