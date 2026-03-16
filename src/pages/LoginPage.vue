<script setup lang="ts">
import { ref } from "vue"
import { login } from "../services/authService"
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"

const username = ref("")
const password = ref("")

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  try {
    const data = await login(username.value, password.value)

    auth.setToken(data.token)

    router.push("/products")
  } catch (error) {
    alert("Login failed")
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-20">

    <h1 class="text-3xl font-bold mb-6 text-center">
      Login to VYBE
    </h1>

    <div class="space-y-4">

      <input
        v-model="username"
        placeholder="Username"
        class="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
      />

      <button
        @click="handleLogin"
        class="w-full bg-purple-600 py-3 rounded hover:bg-purple-500"
      >
        Login
      </button>

    </div>

  </div>
</template>