<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Heart, MoonStar, Search, ShoppingBag, SunMedium, UserRound, X } from "lucide-vue-next"
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
  if (!auth.isLoggedIn) return "Login"
  return auth.user?.firstName || "Profile"
})

const quickSearchResults = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (!normalizedQuery) return []
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

async function ensureSearchProducts() {
  if (hasLoadedSearchProducts.value || isSearchLoading.value) return
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
  <header class="sticky top-0 z-40 w-full">
    <nav class="grid w-full grid-cols-[auto_1fr_auto] items-center gap-0 border-b border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_96%,transparent)] px-4 py-0 text-[color:var(--text)] shadow-[var(--shadow)] backdrop-blur-2xl sm:px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-10 xl:px-14">

      <div class="flex items-center py-3 pr-4 sm:py-4 sm:pr-6 lg:pr-8">
        <RouterLink
          :to="ROUTES.home"
          class="inline-flex leading-none transition-opacity duration-200 hover:opacity-70"
        >
          <span class="vybe-display text-[1.6rem] tracking-[0.14em] text-[color:var(--text)] sm:text-[1.75rem]">VYBE</span>
        </RouterLink>
      </div>

      <div class="hidden items-center justify-center gap-1 lg:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="vybe-surface-link inline-flex h-11 shrink-0 items-center justify-center rounded-full px-5 text-[0.6875rem] uppercase tracking-[0.24em] transition-colors duration-200"
          :class="isNavItemActive(item.label)
            ? 'bg-[color:var(--text)] text-[color:var(--bg)] border-transparent'
            : 'text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--accent-soft)]'"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <div class="flex items-center justify-end gap-1 py-2 pl-2 sm:py-2.5 sm:pl-4">

        <button
          class="vybe-icon-button inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200"
          aria-label="Open quick search"
          type="button"
          @click="openSearch"
        >
          <Search class="h-[1.125rem] w-[1.125rem]" />
        </button>

        <button
          class="vybe-icon-button hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 lg:inline-flex"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          type="button"
          @click="toggleDark"
        >
          <SunMedium v-if="isDark" class="h-5 w-5" />
          <MoonStar v-else class="h-5 w-5" />
        </button>

        <RouterLink
          :to="ROUTES.wishlist"
          class="vybe-icon-button relative hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 lg:inline-flex"
          aria-label="Wishlist"
        >
          <Heart class="h-[1.125rem] w-[1.125rem]" />
          <span
            v-if="bookmarks.count"
            class="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[color:var(--bg-elevated)] bg-[color:var(--bg)] px-1 text-[0.5625rem] font-bold text-[color:var(--text)]"
          >
            {{ bookmarks.count }}
          </span>
        </RouterLink>

        <RouterLink
          :to="ROUTES.cart"
          class="vybe-icon-button relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200"
          aria-label="Cart"
        >
          <ShoppingBag class="h-[1.125rem] w-[1.125rem]" />
          <span
            v-if="cart.itemCount"
            class="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[color:var(--bg-elevated)] bg-[color:var(--accent)] px-1 text-[0.5625rem] font-bold text-black"
          >
            {{ cart.itemCount }}
          </span>
        </RouterLink>

        <div class="mx-2 hidden h-6 w-px bg-[color:var(--line)] lg:block" aria-hidden="true" />

        <button
          class="vybe-surface-link hidden h-11 items-center gap-2.5 rounded-full border border-[color:var(--line)] px-4 text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-200 lg:inline-flex"
          type="button"
          @click="handleProfileClick"
        >
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--bg-elevated)] text-[color:var(--text)]">
            <UserRound class="h-3.5 w-3.5" />
          </span>
          {{ profileLabel }}
        </button>

        <button
          class="vybe-icon-button ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 lg:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-panel"
          :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-linecap="round" class="menu-icon">
            <line
              v-bind="isMobileMenuOpen ? { x1: 4, y1: 4, x2: 16, y2: 16 } : { x1: 3, y1: 7, x2: 17, y2: 7 }"
              stroke-width="1.6"
            />
            <rect
              v-bind="isMobileMenuOpen
                ? { x: 5.2, y: 9, width: 14, height: 2, rx: 1, transform: 'rotate(-45, 10, 10)' }
                : { x: 3, y: 11.5, width: 14, height: 2, rx: 1 }"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </button>
      </div>
    </nav>

    <transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav-panel"
        class="w-full border-b border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_98%,transparent)] px-4 pb-5 pt-3 backdrop-blur-2xl sm:px-6 lg:hidden"
      >
        <div class="flex flex-col gap-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="vybe-surface-link inline-flex h-12 w-full items-center justify-center rounded-2xl text-center text-[0.6875rem] uppercase tracking-[0.24em] transition-colors duration-200"
            :class="isNavItemActive(item.label)
              ? 'bg-[color:var(--text)] text-[color:var(--bg)] border-transparent'
              : ''"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="mt-2 flex flex-col gap-2">
          <RouterLink
            :to="ROUTES.wishlist"
            class="vybe-surface-link inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-[0.6875rem] uppercase tracking-[0.22em] transition-colors duration-200"
          >
            <Heart class="h-4 w-4" />
            Wishlist
            <span v-if="bookmarks.count" class="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[color:var(--bg)] px-1 text-[0.5625rem] font-bold">
              {{ bookmarks.count }}
            </span>
          </RouterLink>

          <button
            class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--text)] text-[color:var(--bg)] text-[0.6875rem] font-semibold uppercase tracking-[0.22em] transition-opacity duration-200 hover:opacity-80"
            type="button"
            @click="handleProfileClick"
          >
            <UserRound class="h-4 w-4" />
            {{ profileLabel }}
          </button>

        </div>
      </div>
    </transition>

    <transition name="quick-search">
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-50 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-5 md:px-6 md:py-6"
        aria-modal="true"
        role="dialog"
      >
        <button
          class="absolute inset-0 bg-[color:color-mix(in_srgb,var(--bg)_74%,black_26%)] backdrop-blur-md"
          aria-label="Close quick search"
          type="button"
          @click="closeSearch"
        />

        <div class="fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_96%,transparent)] shadow-[var(--shadow)] backdrop-blur-2xl sm:relative sm:inset-auto sm:top-1/4 sm:mx-auto sm:max-w-lg sm:rounded-[2rem] md:max-w-3xl">
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
              class="vybe-icon-button inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="Close quick search"
              type="button"
              @click="closeSearch"
            >
              <X class="h-[1.125rem] w-[1.125rem]" />
            </button>
          </div>

          <div class="max-h-[70vh] overflow-y-auto p-4 sm:p-5">
            <div v-if="isSearchLoading" class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm">
              Loading the catalog for search...
            </div>
            <div v-else-if="searchError" class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm">
              {{ searchError }}
            </div>
            <div v-else-if="!searchQuery.trim()" class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm">
              Start typing to search the full product catalog.
            </div>
            <div v-else-if="quickSearchResults.length === 0" class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm">
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
                  <p class="vybe-kicker text-[9px] sm:text-[10px]">{{ product.category }}</p>
                  <h2 class="vybe-display mt-1 line-clamp-2 text-base leading-tight sm:text-xl md:text-2xl">{{ product.title }}</h2>
                  <p class="mt-2 line-clamp-2 text-xs leading-6 text-[color:var(--muted)] sm:text-sm">{{ product.description }}</p>
                </div>
                <div class="shrink-0 text-right">
                  <p class="text-base text-[color:var(--accent)] sm:text-lg">{{ formatPrice(product.price || 0) }}</p>
                  <p class="mt-2 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-[11px]">View</p>
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
.menu-icon line,
.menu-icon rect {
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-search-enter-active,
.quick-search-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.quick-search-enter-from,
.quick-search-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
