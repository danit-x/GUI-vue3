<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore"
import { useCartStore } from "../../stores/cartStore"
import { useDarkMode } from "../../composables/useDarkMode"

const { toggleDark } = useDarkMode()

const cart = useCartStore()



const auth = useAuthStore()
</script>


<template>
  <nav class="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-8 py-4 flex justify-between items-center">
    <div class="flex gap-6 items-center">
      <RouterLink to="/" class="font-bold text-lg">
        VYBE
      </RouterLink>

      <RouterLink to="/products">
        Products
      </RouterLink>

      <RouterLink to="/wishlist">
        Wishlist
      </RouterLink>

      <RouterLink to="/cart">
        Cart ({{ cart.itemCount }})
      </RouterLink>
    </div>

    <div class="flex gap-4 items-center">
      <button
        @click="toggleDark"
        class="px-3 py-1 bg-zinc-800 rounded hover:bg-zinc-700"
      >
        Theme
      </button>

      <RouterLink v-if="!auth.isLoggedIn" to="/login">
        Login
      </RouterLink>

      <button
        v-else
        @click="auth.logout()"
        class="text-red-400 hover:text-red-300"
      >
        Logout
      </button>
    </div>
  </nav>
</template>