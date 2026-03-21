<template>
  <section class="vybe-page space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8">
    <div class="vybe-reveal vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8" style="--delay: 80ms;">
      <div class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div class="space-y-2.5 sm:space-y-3">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">
            The collection
          </p>
          <h1 class="vybe-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
            Shop the living catalog.
          </h1>
          <p class="max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
            Browse by instinct, search by title, move through categories, and open any object in a polished detail view.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-3">
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Loaded</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ products.length }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Showing</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ filteredProducts.length }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Mode</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ activeCategoryLabel }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="vybe-reveal grid gap-4 sm:gap-5 md:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,auto)]" style="--delay: 180ms;">
      <div class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6">
        <label class="vybe-label mb-2.5 block text-[10px] sm:text-[11px]">
          Search products
        </label>
        <input
          v-model="search"
          placeholder="Search by title"
          class="vybe-input w-full rounded-[1.5rem] px-4 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
        />
      </div>

      <div class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6">
        <p class="vybe-label mb-2.5 text-[10px] sm:text-[11px]">
          Filter by category
        </p>
        <div class="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
          <RouterLink
            to="/products"
            class="vybe-pill vybe-touch-target rounded-full px-3 py-2 text-[9px] uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-4 sm:py-2 sm:text-[10px]"
            :class="!activeCategoryKey ? '!border-[color:var(--accent)] !text-[color:var(--text)]' : ''"
          >
            All ({{ products.length }})
          </RouterLink>

          <RouterLink
            v-for="category in filterCategories"
            :key="category.slug"
            :to="`/category/${category.slug}`"
            class="vybe-pill vybe-touch-target rounded-full px-3 py-2 text-[9px] uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-4 sm:py-2 sm:text-[10px]"
            :class="activeCategoryKey === category.slug ? '!border-[color:var(--accent)] !text-[color:var(--text)]' : ''"
          >
            {{ category.label }} ({{ category.count }})
          </RouterLink>
        </div>
      </div>
    </div>

    <div
      v-if="loading"
      class="vybe-panel rounded-[2rem] px-4 py-12 text-center text-[color:var(--muted)] sm:px-6 sm:py-16 md:px-8"
    >
      <div class="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <div class="vybe-spinner h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true" />
        <p class="text-xs uppercase tracking-[0.28em] sm:text-sm">Loading products...</p>
      </div>
    </div>

    <div
      v-else-if="error"
      class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 md:px-8"
    >
      {{ error }}
    </div>

    <template v-else>
      <ProductGrid :products="filteredProducts" />

      <div
        v-if="filteredProducts.length === 0"
        class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 md:px-8"
      >
        No products matched this mood.
      </div>

      <div
        v-else
        class="vybe-panel rounded-[2rem] px-4 py-4 text-center text-xs text-[color:var(--muted)] sm:px-6 sm:py-6 md:text-sm"
      >
        Tap or click any product card to open its detail view.
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { getCategories, getProducts } from "../services/productService"
import ProductGrid from "../components/product/ProductGrid.vue"
import type { Product } from "../types/product"

interface FilterCategory {
  slug: string
  label: string
  count: number
}

const route = useRoute()
const products = ref<Product[]>([])
const categories = ref<string[]>([])
const search = ref("")
const loading = ref(true)
const error = ref("")

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

  if (typeof slug !== "string") {
    return ""
  }

  return slug
})

const activeDummyCategories = computed<string[]>(() => {
  if (!activeCategoryKey.value) {
    return []
  }

  return categoryRouteMap[activeCategoryKey.value] || [activeCategoryKey.value]
})

const activeCategoryLabel = computed(() => {
  if (!activeCategoryKey.value) {
    return "All"
  }

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
  return products.value.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory =
      activeDummyCategories.value.length === 0 ||
      activeDummyCategories.value.includes(product.category)

    return matchesSearch && matchesCategory
  })
})

function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
</script>
