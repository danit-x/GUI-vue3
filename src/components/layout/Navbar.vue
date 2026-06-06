<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Heart, Menu, MoonStar, Search, ShoppingBag, SunMedium, UserRound, X } from "lucide-vue-next"

// Stores
import { useAuthStore } from "../../stores/authStore"
import { useBookmarkStore } from "../../stores/bookmarkStore"
import { useCartStore } from "../../stores/cartStore"

// Composables & Utils
import { useDarkMode } from "../../composables/useDarkMode"
import { ROUTES, getCategoryRoute, getProductDetailRoute } from "../../router/routes"
import { getProducts } from "../../services/productService"
import { buildLoginLocation } from "../../utils/loginRedirect"
import { formatPrice } from "../../utils/formatPrice"
import type { Product } from "../../types/product"

// --- State ---
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const bookmarks = useBookmarkStore()
const cart = useCartStore()
const { toggleDark, isDark } = useDarkMode()

const isMobileMenuOpen = ref(false)

// Search State
const isSearchOpen = ref(false)
const searchQuery = ref("")
const searchInput = ref<HTMLInputElement | null>(null)
const searchProducts = ref<Product[]>([])
const isSearchLoading = ref(false)
const searchError = ref("")
const hasLoadedSearchProducts = ref(false)

// --- Constants ---
const navItems = [
  { label: "Men", to: getCategoryRoute("men") },
  { label: "Women", to: getCategoryRoute("women") },
  { label: "Lifestyle", to: getCategoryRoute("lifestyle") },
  { label: "Tech", to: getCategoryRoute("tech") }
] as const

// --- Computed ---
const profileLabel = computed(() => {
  return auth.isLoggedIn ? auth.user?.firstName || "Profile" : "Login"
})

const quickSearchResults = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (!normalizedQuery) return []
  
  return searchProducts.value
    .filter((product) => product.title.toLowerCase().includes(normalizedQuery))
    .slice(0, 6)
})

// --- Watchers ---
watch(
  () => route.fullPath,
  () => {
    // Close menus when route changes
    isMobileMenuOpen.value = false
    closeSearch()
  }
)

watch(isSearchOpen, async (isOpen) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : ""
  }
  
  if (!isOpen) {
    searchQuery.value = ""
    return
  }
  
  await ensureSearchProducts()
  await nextTick()
  searchInput.value?.focus()
})

// --- Lifecycle ---
onBeforeUnmount(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = ""
  }
})

// --- Methods ---
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
  } catch (error) {
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

function handleSearchSubmit() {
  const firstResult = quickSearchResults.value[0]
  if (firstResult) openSearchProduct(firstResult.id)
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full">
    <nav 
      aria-label="Main Navigation"
      class="grid w-full grid-cols-[auto_1fr_auto] items-center gap-0 border-b border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_96%,transparent)] px-4 py-0 text-[color:var(--text)] shadow-[var(--shadow)] backdrop-blur-2xl sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:px-8 lg:px-10 xl:px-14"
    >
      <!-- Logo -->
      <div class="flex items-center py-3 pr-4 sm:py-4 sm:pr-6 lg:pr-8">
        <RouterLink
          :to="ROUTES.home"
          class="inline-flex leading-none transition-opacity duration-200 hover:opacity-70"
          aria-label="Go to homepage"
        >
          <span class="vybe-display text-[1.6rem] tracking-[0.14em] text-[color:var(--text)] sm:text-[1.75rem]">VYBE</span>
        </RouterLink>
      </div>

      <!-- Desktop Navigation -->
      <ul class="hidden items-center justify-center gap-1 md:flex" role="list">
        <li v-for="item in navItems" :key="item.label">
          <RouterLink
            :to="item.to"
            class="vybe-surface-link inline-flex h-11 shrink-0 items-center justify-center rounded-full px-3 text-[0.625rem] uppercase tracking-[0.2em] transition-colors duration-200 lg:px-5 lg:text-[0.6875rem] lg:tracking-[0.24em]"
            :class="isNavItemActive(item.label)
              ? 'bg-[color:var(--text)] text-[color:var(--bg)] border-transparent'
              : 'text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--accent-soft)]'"
            :aria-current="isNavItemActive(item.label) ? 'page' : undefined"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- Actions (Icons) -->
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
          class="vybe-icon-button hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 md:inline-flex"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          type="button"
          @click="toggleDark"
        >
          <SunMedium v-if="isDark" class="h-5 w-5" />
          <MoonStar v-else class="h-5 w-5" />
        </button>

        <!-- Wishlist -->
        <RouterLink
          :to="ROUTES.wishlist"
          class="wishlist-icon-btn relative hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 md:inline-flex"
          aria-label="Wishlist"
        >
          <Heart class="heart-icon h-[1.125rem] w-[1.125rem] transition-all duration-200" />
          <span
            v-if="bookmarks.count"
            class="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[color:var(--bg-elevated)] bg-[color:var(--bg)] px-1 text-[0.5625rem] font-bold text-[color:var(--text)]"
            aria-hidden="true"
          >
            {{ bookmarks.count }}
          </span>
        </RouterLink>

        <!-- Cart -->
        <RouterLink
          :to="ROUTES.cart"
          class="cart-icon-btn relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200"
          aria-label="Cart"
        >
          <ShoppingBag class="bag-icon h-[1.125rem] w-[1.125rem] transition-all duration-200" />
          <span
            v-if="cart.itemCount"
            class="absolute -right-0.5 -top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[color:var(--bg-elevated)] bg-[color:var(--accent)] px-1 text-[0.5625rem] font-bold text-[color:var(--text)]"
            aria-hidden="true"
          >
            {{ cart.itemCount }}
          </span>
        </RouterLink>

        <div class="mx-2 hidden h-6 w-px bg-[color:var(--line)] lg:block" aria-hidden="true" />

        <!-- Desktop Profile -->
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
          class="vybe-icon-button hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 md:inline-flex lg:hidden"
          :aria-label="profileLabel"
          type="button"
          @click="handleProfileClick"
        >
          <UserRound class="h-[1.125rem] w-[1.125rem]" />
        </button>

        <!-- Mobile Hamburger Menu -->
        <button
          class="vybe-icon-button ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 md:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-panel"
          :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" class="h-[1.125rem] w-[1.125rem]" />
          <Menu v-else class="h-[1.125rem] w-[1.125rem]" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Panel -->
    <transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav-panel"
        class="w-full border-b border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_98%,transparent)] px-4 pb-5 pt-3 backdrop-blur-2xl sm:px-6 md:hidden"
      >
        <ul class="flex flex-col gap-2" role="list">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              class="vybe-surface-link inline-flex h-12 w-full items-center justify-center rounded-2xl text-center text-[0.6875rem] uppercase tracking-[0.24em] transition-colors duration-200"
              :class="isNavItemActive(item.label) ? 'bg-[color:var(--text)] text-[color:var(--bg)] border-transparent' : ''"
              :aria-current="isNavItemActive(item.label) ? 'page' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

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
  </header>

  <!-- Quick Search Modal (Teleported to root for safer z-index and overflow management) -->
  <Teleport to="body">
    <transition name="quick-search">
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 z-[100] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-5 md:px-6 md:py-6"
        aria-modal="true"
        role="dialog"
        aria-labelledby="search-dialog-title"
      >
        <button
          class="absolute inset-0 w-full h-full bg-[color:color-mix(in_srgb,var(--bg)_74%,black_26%)] backdrop-blur-md cursor-default border-none outline-none"
          aria-label="Close quick search"
          type="button"
          @click="closeSearch"
        />

        <div class="fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_96%,transparent)] shadow-[var(--shadow)] backdrop-blur-2xl sm:relative sm:inset-auto sm:top-1/4 sm:mx-auto sm:max-w-lg sm:rounded-[2rem] md:max-w-3xl">
          <form class="flex items-center gap-3 border-b border-[color:var(--line)] px-4 py-4 sm:px-5 sm:py-5" @submit.prevent="handleSearchSubmit">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_86%,transparent)] text-[color:var(--muted)]">
              <Search class="h-5 w-5" aria-hidden="true" />
            </div>

            <div class="min-w-0 flex-1">
              <label id="search-dialog-title" for="global-product-search" class="vybe-label mb-2 block text-[10px] sm:text-[11px]">
                Quick search
              </label>
              <input
                id="global-product-search"
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                placeholder="Search products by title..."
                class="vybe-input w-full rounded-[1.4rem] px-4 py-3 text-sm sm:px-5 sm:text-base outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
                @keydown.esc="closeSearch"
              />
            </div>

            <button
              class="vybe-icon-button inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="Close search window"
              type="button"
              @click="closeSearch"
            >
              <X class="h-[1.125rem] w-[1.125rem]" />
            </button>
          </form>

          <div class="max-h-[70vh] overflow-y-auto p-4 sm:p-5">
            <div v-if="isSearchLoading" class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm text-center">
              Loading the catalog for search...
            </div>
            
            <div v-else-if="searchError" class="vybe-empty px-4 py-10 text-xs text-[color:var(--red-500, red)] sm:px-6 sm:py-12 sm:text-sm text-center">
              {{ searchError }}
            </div>
            
            <div v-else-if="!searchQuery.trim()" class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm text-center">
              Start typing to search the full product catalog.
            </div>
            
            <div v-else-if="quickSearchResults.length === 0" class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 sm:text-sm text-center">
              No products matched "<span class="font-semibold text-[color:var(--text)]">{{ searchQuery.trim() }}</span>".
            </div>

            <div v-else class="space-y-3" role="listbox">
              <button
                v-for="product in quickSearchResults"
                :key="product.id"
                class="vybe-panel vybe-outline-link flex w-full items-center gap-3 rounded-[1.6rem] p-3 text-left sm:gap-4 sm:p-4 hover:bg-[color:var(--bg-elevated)] transition-colors"
                type="button"
                role="option"
                @click="openSearchProduct(product.id)"
              >
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  loading="lazy"
                  decoding="async"
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
  </Teleport>
</template>

<style scoped>
/* Wishlist heart hover */
.wishlist-icon-btn .heart-icon {
  fill: transparent;
  stroke: currentColor;
}
.wishlist-icon-btn:hover .heart-icon,
.wishlist-icon-btn[aria-current="page"] .heart-icon {
  fill: color-mix(in srgb, var(--text) 15%, transparent);
  stroke: var(--text);
}

/* Cart bag hover */
.cart-icon-btn .bag-icon {
  fill: transparent;
  stroke: currentColor;
}
.cart-icon-btn:hover .bag-icon,
.cart-icon-btn[aria-current="page"] .bag-icon {
  fill: color-mix(in srgb, var(--text) 15%, transparent);
  stroke: var(--text);
}

/* Transitions */
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
