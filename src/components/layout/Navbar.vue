<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Heart, Menu, MoonStar, ShoppingBag, SunMedium, UserRound, X } from "lucide-vue-next"
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
const isMobileMenuOpen = ref(false)

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

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
  }
)

function isNavItemActive(label: string) {
  return route.path === `/category/${label.toLowerCase()}`
}

function handleProfileClick() {
  isMobileMenuOpen.value = false
  router.push(auth.isLoggedIn ? "/profile" : "/login")
}

function handleLogout() {
  auth.logout()
  isMobileMenuOpen.value = false
  router.push("/")
}
</script>

<template>
  <header class="sticky top-0 z-40 px-4 pt-3 sm:px-5 md:px-6 lg:px-8">
    <nav class="mx-auto grid max-w-[84rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_84%,transparent)] px-3 py-3 text-[color:var(--text)] shadow-[var(--shadow)] backdrop-blur-2xl sm:px-4 sm:py-4 md:gap-4 md:px-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6 lg:px-6">
      <div class="flex min-w-0 items-center justify-between gap-3 lg:min-w-[12rem] lg:justify-start">
        <RouterLink
          to="/"
          class="group inline-flex min-w-0 flex-col leading-none transition-opacity duration-300 hover:opacity-80"
        >
          <span class="vybe-display text-[clamp(1.5rem,5vw,1.85rem)] tracking-[0.12em] text-[color:var(--text)]">VYBE</span>
        </RouterLink>
      </div>

      <div class="hidden min-w-0 lg:flex lg:items-center lg:justify-center lg:gap-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="vybe-outline-link vybe-touch-target inline-flex shrink-0 items-center justify-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.26em] transition-all duration-300 ease-out"
          :class="isNavItemActive(item.label)
            ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--text)]'
            : 'border-[color:var(--line)] text-[color:var(--muted)] hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]'"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <div class="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-2.5">
        <button
          class="vybe-outline-link vybe-touch-target inline-flex w-11 h-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          type="button"
          @click="toggleDark"
        >
          <SunMedium v-if="isDark" class="h-8 w-8" />
          <MoonStar v-else class="h-8 w-8" />
        </button>

        <RouterLink
          to="/wishlist"
          class="vybe-outline-link vybe-touch-target relative inline-flex w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          aria-label="Wishlist"
        >
          <Heart class="h-[1.125rem] w-[1.125rem]" />
          <span
            v-if="bookmarks.count"
            class="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--bg)] px-1 text-[0.5625rem] font-bold text-[color:var(--text)] sm:px-1.5 sm:text-[0.625rem]"
          >
            {{ bookmarks.count }}
          </span>
        </RouterLink>

        <RouterLink
          to="/cart"
          class="vybe-outline-link vybe-touch-target relative inline-flex w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
          aria-label="Cart"
        >
          <ShoppingBag class="h-[1.125rem] w-[1.125rem]" />
          <span
            v-if="cart.itemCount"
            class="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--accent)] px-1 text-[0.5625rem] font-bold text-black sm:px-1.5 sm:text-[0.625rem]"
          >
            {{ cart.itemCount }}
          </span>
        </RouterLink>

        <button
          class="vybe-outline-link vybe-touch-target hidden items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] px-3 py-2 text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)] sm:inline-flex"
          type="button"
          @click="handleProfileClick"
        >
          <span class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg-elevated)] text-[color:var(--text)]">
            <UserRound class="h-4 w-4" />
          </span>
          <span class="text-xs uppercase tracking-[0.18em]">
            {{ profileLabel }}
          </span>
        </button>

        <button
          class="vybe-outline-link vybe-touch-target inline-flex w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)] lg:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-panel"
          :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" class="h-[1.125rem] w-[1.125rem]" />
          <Menu v-else class="h-[1.125rem] w-[1.125rem]" />
        </button>

        <button
          v-if="auth.isLoggedIn"
          class="vybe-outline-link vybe-touch-target hidden rounded-full border border-[color:var(--line)] px-5 py-2 text-[0.625rem] uppercase tracking-[0.24em] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)] xl:inline-flex"
          type="button"
          @click="handleLogout"
        >
          Log Out
        </button>
      </div>

      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav-panel"
        class="col-span-2 grid gap-3 border-t border-[color:var(--line)] pt-3 lg:hidden"
      >
        <div class="grid gap-2 sm:grid-cols-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="vybe-outline-link vybe-touch-target inline-flex items-center justify-center rounded-[1.35rem] border px-4 py-3 text-center text-[0.6875rem] uppercase tracking-[0.24em] transition-all duration-300 ease-out"
            :class="isNavItemActive(item.label)
              ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--text)]'
              : 'border-[color:var(--line)] text-[color:var(--muted)] hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]'"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <button
            class="vybe-outline-link vybe-touch-target inline-flex items-center justify-center gap-2 rounded-[1.35rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)] px-4 py-3 text-[0.6875rem] uppercase tracking-[0.22em] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
            type="button"
            @click="handleProfileClick"
          >
            <UserRound class="h-4 w-4" />
            {{ profileLabel }}
          </button>

          <button
            v-if="auth.isLoggedIn"
            class="vybe-outline-link vybe-touch-target inline-flex items-center justify-center rounded-[1.35rem] border border-[color:var(--line)] px-4 py-3 text-[0.6875rem] uppercase tracking-[0.22em] text-[color:var(--muted)] transition-all duration-300 ease-out hover:border-[color:var(--text)]/30 hover:text-[color:var(--text)]"
            type="button"
            @click="handleLogout"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
