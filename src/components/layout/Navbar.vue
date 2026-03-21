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
  { label: "Men", to: "/category/men" },
  { label: "Women", to: "/category/women" },
  { label: "Lifestyle", to: "/category/lifestyle" },
  { label: "Tech", to: "/category/tech" }
] as const

const profileLabel = computed(() => {
  if (!auth.isLoggedIn) {
    return "Login"
  }

  return auth.user?.firstName || "Profile"
})

function isNavItemActive(label: string) {
  return route.path === `/category/${label.toLowerCase()}`
}

function handleProfileClick() {
  router.push(auth.isLoggedIn ? "/profile" : "/login")
}

function handleLogout() {
  auth.logout()
  router.push("/")
}
</script>

<template>
  <header class="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
    <nav class="mx-auto flex max-w-[84rem] flex-wrap items-center gap-3 rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_84%,transparent)] px-4 py-4 text-[color:var(--text)] shadow-[var(--shadow)] backdrop-blur-2xl sm:px-5 lg:flex-nowrap lg:gap-6 lg:px-6">
      
      <div class="flex min-w-0 flex-1 items-center justify-between gap-3 lg:min-w-[14rem] lg:flex-none lg:justify-start">
        <RouterLink
          to="/"
          class="group inline-flex flex-col leading-none transition-opacity duration-300 hover:opacity-80"
        >
          <span class="vybe-display text-[1.85rem] tracking-[0.12em] text-[color:var(--text)]">VYBE</span>
        </RouterLink>

        <button
          v-if="auth.isLoggedIn"
          @click="handleLogout"
          class="vybe-outline-link inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[color:var(--line)] px-5 py-2 text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)] lg:hidden"
          type="button"
        >
          Log Out
        </button>
      </div>

      <div class="order-3 flex w-full items-center gap-2 overflow-x-auto pb-1 lg:order-2 lg:justify-center">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="vybe-outline-link shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.28em] transition-all duration-300 ease-out"
          :class="isNavItemActive(item.label) 
            ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--text)]' 
            : 'border-[color:var(--line)] text-[color:var(--muted)] hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]'"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <div class="order-2 ml-auto flex items-center gap-2 sm:gap-3 lg:order-3">
        
        <button
          @click="toggleDark"
          class="vybe-outline-link inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          type="button"
        >
          <SunMedium v-if="isDark" class="h-[18px] w-[18px]" />
          <MoonStar v-else class="h-[18px] w-[18px]" />
        </button>

        <RouterLink
          to="/wishlist"
          class="vybe-outline-link relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          aria-label="Wishlist"
        >
          <Heart class="h-[18px] w-[18px]" />
          <span
            v-if="bookmarks.count"
            class="absolute -right-1 -top-1 inline-flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--bg)] px-1.5 text-[10px] font-bold text-[color:var(--text)]"
          >
            {{ bookmarks.count }}
          </span>
        </RouterLink> 

        <RouterLink
          to="/cart"
          class="vybe-outline-link relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          aria-label="Cart"
        >
          <ShoppingBag class="h-[18px] w-[18px]" />
          <span
            v-if="cart.itemCount"
            class="absolute -right-1 -top-1 inline-flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[color:var(--accent)] px-1.5 text-[10px] font-bold text-black"
          >
            {{ cart.itemCount }}
          </span>
        </RouterLink>

        <button
          @click="handleProfileClick"
          class="vybe-outline-link inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] px-3 py-2 text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          type="button"
        >
          <span class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg-elevated)] text-[color:var(--text)]">
            <UserRound class="h-4 w-4" />
          </span>
          <span class="hidden text-sm uppercase tracking-[0.18em] sm:inline">
            {{ profileLabel }}
          </span>
        </button>

        <button
          v-if="auth.isLoggedIn"
          @click="handleLogout"
          class="vybe-outline-link hidden xl:inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[color:var(--line)] px-6 py-2 text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          type="button"
        >
          Log Out
        </button>

      </div>
    </nav>
  </header>
</template>