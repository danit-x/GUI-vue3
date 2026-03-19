<script setup lang="ts">
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Heart, MoonStar, ShoppingBag, SunMedium, UserRound } from "lucide-vue-next"
import { useAuthStore } from "../../stores/authStore"
import { useBookmarkStore } from "../../stores/bookmarkStore"
import { useCartStore } from "../../stores/cartStore"
import { useDarkMode } from "../../composables/useDarkMode"

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const bookmarks = useBookmarkStore()
const cart = useCartStore()
const { toggleDark, isDark } = useDarkMode()

const navItems = [
  { label: "Men", to: { path: "/products", query: { collection: "men" } } },
  { label: "Women", to: { path: "/products", query: { collection: "women" } } },
  { label: "Lifestyle", to: { path: "/products", query: { collection: "lifestyle" } } },
  { label: "Tech", to: { path: "/products", query: { collection: "tech" } } }
] as const

const profileLabel = computed(() => {
  if (!auth.isLoggedIn) {
    return "Login"
  }

  return auth.user?.firstName || "Profile"
})

function isNavItemActive(label: string) {
  return route.path === "/products" && String(route.query.collection || "").toLowerCase() === label.toLowerCase()
}

function handleProfileClick() {
  router.push("/login")
}

function handleLogout() {
  auth.logout()
  router.push("/")
}
</script>

<template>
  <header class="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
    <nav class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-black/55 px-5 py-4 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl supports-[backdrop-filter]:bg-black/45 sm:px-6">
      <div class="flex min-w-0 items-center gap-4">
        <RouterLink
          to="/"
          class="group relative inline-flex items-center rounded-full px-3 py-2 transition duration-300 hover:text-white"
        >
          <span class="absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 group-hover:bg-cyan-400/12" />
          <span class="relative text-lg font-semibold tracking-[0.45em] text-white/95">
            VYBE
          </span>
        </RouterLink>
      </div>

      <div class="order-3 flex w-full items-center justify-center gap-2 overflow-x-auto pb-1 md:order-2 md:w-auto">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium tracking-[0.22em] text-white/68 transition duration-300 hover:-translate-y-px hover:text-white"
          :class="isNavItemActive(item.label) ? 'bg-white/10 text-white shadow-[0_0_22px_rgba(125,211,252,0.18)]' : 'hover:bg-white/6'"
        >
          <span class="absolute inset-0 rounded-full bg-cyan-300/0 blur-lg transition duration-300 group-hover:bg-cyan-300/10" />
          <span class="relative uppercase">{{ item.label }}</span>
        </RouterLink>
      </div>

      <div class="order-2 flex items-center gap-2 sm:gap-3 md:order-3">
        <button
          @click="toggleDark"
          class="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition duration-300 hover:-translate-y-px hover:border-cyan-300/25 hover:text-white"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          type="button"
        >
          <span class="absolute inset-0 rounded-full bg-cyan-300/0 blur-xl transition duration-300 group-hover:bg-cyan-300/12" />
          <SunMedium v-if="isDark" class="relative h-[18px] w-[18px]" />
          <MoonStar v-else class="relative h-[18px] w-[18px]" />
        </button>

        <RouterLink
          to="/wishlist"
          class="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition duration-300 hover:-translate-y-px hover:border-cyan-300/25 hover:text-white"
          aria-label="Wishlist"
        >
          <span class="absolute inset-0 rounded-full bg-cyan-300/0 blur-xl transition duration-300 group-hover:bg-cyan-300/12" />
          <Heart class="relative h-[18px] w-[18px]" />
          <span
            v-if="bookmarks.count"
            class="absolute -right-0.5 -top-0.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border border-black/40 bg-white px-1 text-[10px] font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            {{ bookmarks.count }}
          </span>
        </RouterLink>

        <RouterLink
          to="/cart"
          class="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition duration-300 hover:-translate-y-px hover:border-cyan-300/25 hover:text-white"
          aria-label="Cart"
        >
          <span class="absolute inset-0 rounded-full bg-cyan-300/0 blur-xl transition duration-300 group-hover:bg-cyan-300/12" />
          <ShoppingBag class="relative h-[18px] w-[18px]" />
          <span
            v-if="cart.itemCount"
            class="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 animate-pulse items-center justify-center rounded-full bg-cyan-300 px-1 text-[10px] font-semibold text-black shadow-[0_0_24px_rgba(103,232,249,0.45)]"
          >
            {{ cart.itemCount }}
          </span>
        </RouterLink>

        <button
          @click="handleProfileClick"
          class="group relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/76 transition duration-300 hover:-translate-y-px hover:border-cyan-300/25 hover:text-white"
          type="button"
        >
          <span class="absolute inset-0 rounded-full bg-cyan-300/0 blur-xl transition duration-300 group-hover:bg-cyan-300/12" />
          <span class="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10">
            <UserRound class="h-4 w-4" />
          </span>
          <span class="relative hidden text-sm font-medium sm:inline">
            {{ profileLabel }}
          </span>
        </button>

        <button
          v-if="auth.isLoggedIn"
          @click="handleLogout"
          class="hidden rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/58 transition duration-300 hover:border-cyan-300/25 hover:text-white lg:inline-flex"
          type="button"
        >
          Log Out
        </button>
      </div>
    </nav>
  </header>
</template>
