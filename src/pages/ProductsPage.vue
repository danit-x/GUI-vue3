<template>
  <section class="vybe-page space-y-6 sm:space-y-8">

    <!-- Hero — removed Loaded/Showing, kept only Mode stat -->
    <div class="vybe-reveal vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8" style="--delay: 80ms;">
      <div class="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div class="space-y-2.5 sm:space-y-3">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">The collection</p>
          <h1 class="vybe-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
            Shop the living catalog.
          </h1>
          <p class="max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
            Browse by instinct, search by title, move through categories, and open any object in a polished detail view.
          </p>
        </div>

        <!-- Single stat: current mode only -->
        <div class="flex lg:justify-end">
          <div class="vybe-stat min-w-[9rem]">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Browsing</p>
            <p class="mt-2 sm:mt-3 text-xl sm:text-2xl text-[color:var(--text)]">{{ activeCategoryLabel }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Compact filter + sort bar -->
    <div class="vybe-reveal vybe-panel rounded-[2rem] p-4 sm:p-5" style="--delay: 180ms;">

      <!-- Search row -->
      <div class="mb-4">
        <input
          v-model="search"
          placeholder="Search products..."
          class="vybe-input w-full rounded-[1.5rem] px-4 py-3 text-xs sm:px-5 sm:py-3.5 sm:text-sm"
        />
      </div>

      <!-- Categories + Sort in one row -->
      <div class="flex items-start gap-3 sm:gap-4">

        <!-- Category pills: horizontally scrollable strip -->
        <div class="relative min-w-0 flex-1">
          <p class="vybe-label mb-2 text-[9px] sm:text-[10px]">Category</p>
          <div class="no-scrollbar flex gap-2 overflow-x-auto pb-1 sm:gap-2.5">
            <RouterLink
              :to="ROUTES.products"
              class="vybe-pill vybe-touch-target shrink-0 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-4 sm:py-2 sm:text-[10px]"
              :class="!activeCategoryKey ? '!border-[color:var(--accent)] !text-[color:var(--text)]' : ''"
            >
              All
            </RouterLink>

            <RouterLink
              v-for="category in filterCategories"
              :key="category.slug"
              :to="getCategoryRoute(category.slug)"
              class="vybe-pill vybe-touch-target shrink-0 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-4 sm:py-2 sm:text-[10px]"
              :class="activeCategoryKey === category.slug ? '!border-[color:var(--accent)] !text-[color:var(--text)]' : ''"
            >
              {{ category.label }}
            </RouterLink>
          </div>
        </div>

        <!-- Custom sort dropdown -->
        <div class="shrink-0">
          <p class="vybe-label mb-2 text-[9px] sm:text-[10px]">Sort</p>
          <div class="relative">
            <select
              v-model="sortBy"
              class="vybe-pill vybe-touch-target appearance-none cursor-pointer rounded-[1.25rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_94%,transparent)] py-2 pl-4 pr-9 text-[9px] uppercase tracking-[0.18em] text-[color:var(--text)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-soft)] sm:py-2.5 sm:pl-5 sm:pr-10 sm:text-[10px]"
            >
              <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
                class="bg-[color:var(--bg-strong)] text-[color:var(--text)]"
              >
                {{ option.label }}
              </option>
            </select>
            <!-- Custom chevron -->
            <svg
              class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[color:var(--muted)] sm:right-3.5"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

      </div>
    </div>

    <!-- Loading skeletons -->
    <div
      v-if="loading"
      class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6"
    >
      <article
        v-for="skeleton in skeletonCards"
        :key="skeleton"
        class="vybe-panel overflow-hidden rounded-[2.1rem] p-2 sm:p-3"
        aria-hidden="true"
      >
        <div class="animate-pulse">
          <div class="rounded-[1.75rem] bg-[color:color-mix(in_srgb,var(--bg-strong)_88%,transparent)] aspect-[4/3] w-full" />
          <div class="space-y-3 p-3 sm:space-y-4 sm:p-4 md:p-5">
            <div class="h-3 w-20 rounded-full bg-[color:color-mix(in_srgb,var(--line)_75%,transparent)]" />
            <div class="space-y-2">
              <div class="h-6 w-4/5 rounded-full bg-[color:color-mix(in_srgb,var(--bg-strong)_90%,transparent)]" />
              <div class="h-6 w-3/5 rounded-full bg-[color:color-mix(in_srgb,var(--bg-strong)_82%,transparent)]" />
            </div>
            <div class="space-y-2">
              <div class="h-3 w-full rounded-full bg-[color:color-mix(in_srgb,var(--line)_70%,transparent)]" />
              <div class="h-3 w-5/6 rounded-full bg-[color:color-mix(in_srgb,var(--line)_58%,transparent)]" />
            </div>
            <div class="flex items-center justify-between gap-3 pt-1">
              <div class="h-4 w-20 rounded-full bg-[color:color-mix(in_srgb,var(--line)_70%,transparent)]" />
              <div class="h-6 w-16 rounded-full bg-[color:color-mix(in_srgb,var(--bg-strong)_90%,transparent)]" />
            </div>
            <div class="mt-2 grid gap-2 sm:grid-cols-2 sm:gap-3">
              <div class="h-10 rounded-full bg-[color:color-mix(in_srgb,var(--bg-strong)_92%,transparent)]" />
              <div class="h-10 rounded-full bg-[color:color-mix(in_srgb,var(--line)_70%,transparent)]" />
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 md:px-8"
    >
      {{ error }}
    </div>

    <!-- Products -->
    <template v-else>
      <ProductGrid :products="paginatedProducts" />

      <div
        v-if="filteredProducts.length === 0"
        class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 md:px-8"
      >
        No products matched this mood.
      </div>

      <!-- Pagination -->
      <div v-else>
        <div class="vybe-panel flex flex-col gap-3 rounded-[2rem] px-4 py-4 text-center text-xs text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 md:text-sm">
          <p>Tap or click any product to open its detail view.</p>
          <div class="flex items-center justify-center gap-3 sm:justify-end">
            <button
              type="button"
              class="vybe-pill vybe-touch-target rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-2.5 sm:text-xs"
              :disabled="currentPage === 1"
              @click="goToPreviousPage"
            >
              Previous
            </button>

            <p class="min-w-[7rem] text-center text-[10px] uppercase tracking-[0.22em] text-[color:var(--text)] sm:text-xs">
              Page {{ currentPage }} of {{ totalPages }}
            </p>

            <button
              type="button"
              class="vybe-pill vybe-touch-target rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-2.5 sm:text-xs"
              :disabled="currentPage === totalPages"
              @click="goToNextPage"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </template>

  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { ROUTES, getCategoryRoute } from "../router/routes"
import { getCategories, getProducts } from "../services/productService"
import ProductGrid from "../components/product/ProductGrid.vue"
import type { Product } from "../types/product"

interface FilterCategory {
  slug: string
  label: string
  count: number
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc"

const PRODUCTS_PER_PAGE = 24

const route = useRoute()
const products = ref<Product[]>([])
const categories = ref<string[]>([])
const search = ref("")
const sortBy = ref<SortOption>("default")
const loading = ref(true)
const error = ref("")
const currentPage = ref(1)
const skeletonCards = Array.from({ length: 8 }, (_, index) => index)
const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating-desc" }
]

const categoryRouteMap: Record<string, string[]> = {
  men: ["mens-shirts", "mens-shoes", "mens-watches"],
  women: ["tops", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"],
  tech: ["laptops", "mobile-accessories", "smartphones", "tablets"],
  lifestyle: ["beauty", "fragrances", "furniture", "groceries", "home-decoration", "kitchen-accessories", "skin-care", "sports-accessories", "sunglasses", "vehicle"]
}

onMounted(async () => {
  loading.value = true
  error.value = ""

  try {
    const [productData, categoryData] = await Promise.all([
      getProducts(),
      getCategories()
    ])

    products.value = productData.products
    categories.value = categoryData
  } catch {
    error.value = "Unable to load the catalog right now."
  } finally {
    loading.value = false
  }
})

const activeCategoryKey = computed<string>(() => {
  const slug = route.params.slug
  if (typeof slug !== "string") return ""
  return slug
})

const activeDummyCategories = computed<string[]>(() => {
  if (!activeCategoryKey.value) return []
  return categoryRouteMap[activeCategoryKey.value] || [activeCategoryKey.value]
})

const activeCategoryLabel = computed(() => {
  if (!activeCategoryKey.value) return "All"
  return formatCategoryLabel(activeCategoryKey.value)
})

const categoryCounts = computed<Record<string, number>>(() => {
  return products.value.reduce<Record<string, number>>((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1
    return counts
  }, {})
})

const filterCategories = computed<FilterCategory[]>(() => {
  return categories.value.map((category) => ({
    slug: category,
    label: formatCategoryLabel(category),
    count: categoryCounts.value[category] || 0
  }))
})

const filteredProducts = computed<Product[]>(() => {
  const visibleProducts = products.value.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory =
      activeDummyCategories.value.length === 0 ||
      activeDummyCategories.value.includes(product.category)
    return matchesSearch && matchesCategory
  })

  if (sortBy.value === "price-asc") return [...visibleProducts].sort((a, b) => a.price - b.price)
  if (sortBy.value === "price-desc") return [...visibleProducts].sort((a, b) => b.price - a.price)
  if (sortBy.value === "rating-desc") return [...visibleProducts].sort((a, b) => b.rating - a.rating)
  return visibleProducts
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / PRODUCTS_PER_PAGE)))

const paginatedProducts = computed<Product[]>(() => {
  const start = (currentPage.value - 1) * PRODUCTS_PER_PAGE
  const end = start + PRODUCTS_PER_PAGE
  return filteredProducts.value.slice(start, end)
})

watch([search, activeCategoryKey, sortBy], () => {
  currentPage.value = 1
})

watch(totalPages, (nextTotalPages) => {
  if (currentPage.value > nextTotalPages) currentPage.value = nextTotalPages
})

function goToPreviousPage() {
  if (currentPage.value > 1) currentPage.value -= 1
}

function goToNextPage() {
  if (currentPage.value < totalPages.value) currentPage.value += 1
}

function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
</script>