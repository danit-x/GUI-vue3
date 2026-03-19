<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore"
import { useBookmarkStore } from "../../stores/bookmarkStore"
import { useCartStore } from "../../stores/cartStore"
import { useDarkMode } from "../../composables/useDarkMode"
import { useRouter } from "vue-router"

const { toggleDark, isDark } = useDarkMode()
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
  <header class="relative z-20 px-4 pt-4 sm:px-6 lg:px-8">
    <nav class="vybe-panel mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex flex-wrap items-center gap-4">
        <RouterLink to="/" class="vybe-display text-2xl uppercase tracking-[0.35em]">
          VYBE
        </RouterLink>

        <div class="flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.18em]">
          <RouterLink to="/products" class="vybe-pill rounded-full px-4 py-2 transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]">
            Shop
          </RouterLink>
          <RouterLink to="/wishlist" class="vybe-pill rounded-full px-4 py-2 transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]">
            Archive {{ bookmarks.count }}
          </RouterLink>
          <RouterLink to="/cart" class="vybe-pill rounded-full px-4 py-2 transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]">
            Cart {{ cart.itemCount }}
          </RouterLink>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <span v-if="auth.user" class="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
          {{ auth.user.firstName }} {{ auth.user.lastName }}
        </span>

        <button
          @click="toggleDark"
          class="vybe-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
        >
          {{ isDark ? "Light Room" : "Night Room" }}
        </button>

        <div v-if="!auth.isLoggedIn" class="flex flex-wrap items-center gap-2">
          <RouterLink to="/login" class="vybe-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]">
            Log In
          </RouterLink>
          <RouterLink to="/signup" class="vybe-button rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">
            Join In
          </RouterLink>
        </div>

        <button
          v-else
          @click="handleLogout"
          class="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
        >
          Log Out
        </button>
      </div>
    </nav>
  </header>
</template>
