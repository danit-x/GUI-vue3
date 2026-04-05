<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Heart, Menu, MoonStar, Search, ShoppingBag, SunMedium, UserRound, X } from "lucide-vue-next"
import { useAuthStore } from "../../stores/authStore"
import { useBookmarkStore } from "../../stores/bookmarkStore"
import { useCartStore } from "../../stores/cartStore"
import { useDarkMode } from "../../composables/useDarkMode"
import { ROUTES, getCategoryRoute, getProductDetailRoute } from "../../router/routes"
import { getProducts } from "../../services/productService"
import { buildLoginLocation } from "../../utils/loginRedirect"
import { formatPrice } from "../../utils/formatPrice"
import type { Product } from "../../types/product"

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const bookmarks = useBookmarkStore()
const cart = useCartStore()
const { toggleDark, isDark } = useDarkMode()
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref("")
const searchInput = ref<HTMLInputElement | null>(null)
const searchProducts = ref<Product[]>([])
const isSearchLoading = ref(false)
const searchError = ref("")
const hasLoadedSearchProducts = ref(false)

const navItems = [
  { label: "Men", to: getCategoryRoute("men") },
  { label: "Women", to: getCategoryRoute("women") },
  { label: "Lifestyle", to: getCategoryRoute("lifestyle") },
  { label: "Tech", to: getCategoryRoute("tech") }
] as const

const profileLabel = computed(() => {
  if (!auth.isLoggedIn) {
    return "Login"
  }

  return auth.user?.firstName || "Profile"
})

const quickSearchResults = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return searchProducts.value
    .filter((product) => product.title.toLowerCase().includes(normalizedQuery))
    .slice(0, 6)
})

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
    closeSearch()
  }
)

watch(isSearchOpen, async (open) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = open ? "hidden" : ""
  }

  if (!open) {
    searchQuery.value = ""
    return
  }

  await ensureSearchProducts()
  await nextTick()
  searchInput.value?.focus()
})

onBeforeUnmount(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = ""
  }
})

function isNavItemActive(label: string) {
  return route.path === getCategoryRoute(label.toLowerCase())
}

function handleProfileClick() {
  isMobileMenuOpen.value = false
  router.push(auth.isLoggedIn ? ROUTES.profile : buildLoginLocation(route.fullPath))
}

function handleLogout() {
  auth.logout()
  isMobileMenuOpen.value = false
  router.push(ROUTES.home)
}

async function ensureSearchProducts() {
  if (hasLoadedSearchProducts.value || isSearchLoading.value) {
    return
  }

  isSearchLoading.value = true
  searchError.value = ""

  try {
    const productData = await getProducts()
    searchProducts.value = productData.products
    hasLoadedSearchProducts.value = true
  } catch {
    searchError.value = "Quick search is unavailable right now."
  } finally {
    isSearchLoading.value = false
  }
}

function openSearch() {
  isMobileMenuOpen.value = false
  isSearchOpen.value = true
}

function closeSearch() {
  isSearchOpen.value = false
}

function openSearchProduct(productId: number) {
  closeSearch()
  router.push(getProductDetailRoute(productId))
}
</script>

<template>
  <header class="sticky top-0 z-40 px-4 pt-3 sm:px-5 md:px-6 lg:px-8">
    <nav class="mx-auto grid max-w-[84rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_84%,transparent)] px-3 py-3 text-[color:var(--text)] shadow-[var(--shadow)] backdrop-blur-2xl sm:px-4 sm:py-4 md:gap-4 md:px-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6 lg:px-6">
      <div class="flex min-w-0 items-center justify-between gap-3 lg:min-w-[12rem] lg:justify-start">
        <RouterLink
          :to="ROUTES.home"
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
          class="vybe-surface-link vybe-touch-target inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.26em]"
          :class="isNavItemActive(item.label)
            ? '!border-[color:var(--accent)] bg-[color:var(--accent-soft)] !text-[color:var(--text)]'
            : ''"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <div class="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-2.5">
        <button
          class="vybe-icon-button vybe-touch-target h-11 w-11 rounded-full"
          aria-label="Open quick search"
          type="button"
          @click="openSearch"
        >
          <Search class="h-[1.125rem] w-[1.125rem]" />
        </button>

        <button
          class="vybe-icon-button vybe-touch-target h-11 w-11 rounded-full"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          type="button"
          @click="toggleDark"
        >
          <SunMedium v-if="isDark" class="h-8 w-8" />
          <MoonStar v-else class="h-8 w-8" />
        </button>

        <RouterLink
          :to="ROUTES.wishlist"
          class="vybe-icon-button vybe-touch-target relative h-11 w-11 rounded-full"
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
          :to="ROUTES.cart"
          class="vybe-icon-button vybe-touch-target relative h-11 w-11 rounded-full"
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
          class="vybe-surface-link vybe-touch-target hidden items-center gap-3 rounded-full px-3 py-2 sm:inline-flex"
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
          class="vybe-icon-button vybe-touch-target hidden h-11 w-11 rounded-full max-lg:inline-flex"
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
          class="vybe-surface-link vybe-touch-target hidden rounded-full px-5 py-2 text-[0.625rem] uppercase tracking-[0.24em] xl:inline-flex"
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
            class="vybe-surface-link vybe-touch-target inline-flex items-center justify-center rounded-[1.35rem] px-4 py-3 text-center text-[0.6875rem] uppercase tracking-[0.24em]"
            :class="isNavItemActive(item.label)
              ? '!border-[color:var(--accent)] bg-[color:var(--accent-soft)] !text-[color:var(--text)]'
              : ''"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <button
            class="vybe-surface-link vybe-touch-target inline-flex items-center justify-center gap-2 rounded-[1.35rem] px-4 py-3 text-[0.6875rem] uppercase tracking-[0.22em]"
            type="button"
            @click="handleProfileClick"
          >
            <UserRound class="h-4 w-4" />
            {{ profileLabel }}
          </button>

          <button
            v-if="auth.isLoggedIn"
            class="vybe-surface-link vybe-touch-target inline-flex items-center justify-center rounded-[1.35rem] px-4 py-3 text-[0.6875rem] uppercase tracking-[0.22em]"
            type="button"
            @click="handleLogout"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>

    <transition name="quick-search">
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-50 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6"
        aria-modal="true"
        role="dialog"
      >
        <button
          class="absolute inset-0 bg-[color:color-mix(in_srgb,var(--bg)_74%,black_26%)] backdrop-blur-md"
          aria-label="Close quick search"
          type="button"
          @click="closeSearch"
        />

        <div class="relative mx-auto flex max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_96%,transparent)] shadow-[var(--shadow)] backdrop-blur-2xl">
          <div class="flex items-center gap-3 border-b border-[color:var(--line)] px-4 py-4 sm:px-5 sm:py-5">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_86%,transparent)] text-[color:var(--muted)]">
              <Search class="h-5 w-5" />
            </div>

            <div class="min-w-0 flex-1">
              <label for="global-product-search" class="vybe-label mb-2 block text-[10px] sm:text-[11px]">
                Quick search
              </label>
              <input
                id="global-product-search"
                ref="searchInput"
                v-model="searchQuery"
                placeholder="Search products by title"
                class="vybe-input w-full rounded-[1.4rem] px-4 py-3 text-sm sm:px-5 sm:text-base"
                @keydown.esc="closeSearch"
              />
            </div>

            <button
              class="vybe-icon-button vybe-touch-target h-11 w-11 rounded-full"
              aria-label="Close quick search"
              type="button"
              @click="closeSearch"
            >
              <X class="h-[1.125rem] w-[1.125rem]" />
            </button>
          </div>

          <div class="max-h-[70vh] overflow-y-auto p-4 sm:p-5">
            <div
              v-if="isSearchLoading"
              class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm"
            >
              Loading the catalog for search...
            </div>

            <div
              v-else-if="searchError"
              class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm"
            >
              {{ searchError }}
            </div>

            <div
              v-else-if="!searchQuery.trim()"
              class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm"
            >
              Start typing to search the full product catalog.
            </div>

            <div
              v-else-if="quickSearchResults.length === 0"
              class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm"
            >
              No products matched "{{ searchQuery.trim() }}".
            </div>

            <div v-else class="space-y-3">
              <button
                v-for="product in quickSearchResults"
                :key="product.id"
                class="vybe-panel vybe-outline-link flex w-full items-center gap-3 rounded-[1.6rem] p-3 text-left sm:gap-4 sm:p-4"
                type="button"
                @click="openSearchProduct(product.id)"
              >
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="h-18 w-18 shrink-0 rounded-[1.2rem] object-cover sm:h-20 sm:w-20"
                />

                <div class="min-w-0 flex-1">
                  <p class="vybe-kicker text-[9px] sm:text-[10px]">
                    {{ product.category }}
                  </p>
                  <h2 class="vybe-display mt-1 line-clamp-2 text-2xl leading-tight sm:text-3xl">
                    {{ product.title }}
                  </h2>
                  <p class="mt-2 line-clamp-2 text-xs leading-6 text-[color:var(--muted)] sm:text-sm">
                    {{ product.description }}
                  </p>
                </div>

                <div class="shrink-0 text-right">
                  <p class="text-base text-[color:var(--accent)] sm:text-lg">
                    {{ formatPrice(product.price || 0) }}
                  </p>
                  <p class="mt-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-[11px]">
                    View
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.quick-search-enter-active,
.quick-search-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.quick-search-enter-from,
.quick-search-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
