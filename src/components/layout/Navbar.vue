<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore"
import { useBookmarkStore } from "../../stores/bookmarkStore"
import { useCartStore } from "../../stores/cartStore"
import { useDarkMode } from "../../composables/useDarkMode"
import { useRouter } from "vue-router"

const { toggleDark } = useDarkMode()
const { isDark } = useDarkMode()

const cart = useCartStore()
const bookmarks = useBookmarkStore()

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push("/")
}
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
        Wishlist ({{ bookmarks.count }})
      </RouterLink>

      <RouterLink to="/cart">
        Cart ({{ cart.itemCount }})
      </RouterLink>
    </div>

    <div class="flex gap-4 items-center">
      <span v-if="auth.user" class="text-sm text-zinc-500 dark:text-zinc-400">
        {{ auth.user.firstName }} {{ auth.user.lastName }}
      </span>

      <button
        @click="toggleDark"
        class="rounded bg-zinc-200 px-3 py-1 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
      >
        {{ isDark ? "Light Mode" : "Dark Mode" }}
      </button>

      <div v-if="!auth.isLoggedIn" class="flex items-center gap-3">
        <RouterLink to="/login">
          Log In
        </RouterLink>

        <RouterLink to="/signup">
          Sign Up
        </RouterLink>
      </div>

      <button
        v-else
        @click="handleLogout"
        class="text-red-400 hover:text-red-300"
      >
        Log Out
      </button>
    </div>
  </nav>
</template>
