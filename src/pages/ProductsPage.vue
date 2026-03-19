<template>
  <section class="space-y-8 py-6">
    <div class="vybe-reveal vybe-panel rounded-[2.25rem] p-6 sm:p-8" style="--delay: 80ms;">
      <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div class="space-y-3">
          <p class="text-xs uppercase tracking-[0.4em] text-[color:var(--muted)]">
            The collection
          </p>
          <h1 class="vybe-display text-5xl leading-none sm:text-6xl">
            Shop the living catalog.
          </h1>
          <p class="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Browse by instinct: search by title, drift through curated route categories, and open any object through the product detail route.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-4">
            <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Loaded
            </p>
            <p class="mt-2 text-2xl">{{ products.length }}</p>
          </div>
          <div class="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-4">
            <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Showing
            </p>
            <p class="mt-2 text-2xl">{{ filteredProducts.length }}</p>
          </div>
          <div class="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-4">
            <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Mode
            </p>
            <p class="mt-2 text-2xl">{{ activeCategoryLabel }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="vybe-reveal space-y-5" style="--delay: 180ms;">
      <input
        v-model="search"
        placeholder="Search the catalog"
        class="vybe-input w-full rounded-[1.75rem] px-5 py-4 text-base"
      />

      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/products"
          class="vybe-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
          :class="!activeCategoryKey ? '!border-[color:var(--accent)] !text-[color:var(--text)]' : ''"
        >
          All
        </RouterLink>

        <RouterLink
          v-for="category in routeCategories"
          :key="category.slug"
          :to="`/category/${category.slug}`"
          class="vybe-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
          :class="activeCategoryKey === category.slug ? '!border-[color:var(--accent)] !text-[color:var(--text)]' : ''"
        >
          {{ category.label }}
        </RouterLink>
      </div>
    </div>

    <ProductGrid :products="filteredProducts" />

    <div
      v-if="filteredProducts.length === 0"
      class="vybe-panel rounded-[2rem] px-6 py-10 text-center text-[color:var(--muted)]"
    >
      No products matched this mood.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { getProducts } from "../services/productService"
import ProductGrid from "../components/product/ProductGrid.vue"
import type { Product } from "../types/product"

type CategoryRouteSlug = "men" | "women" | "tech" | "lifestyle"

interface RouteCategory {
  slug: CategoryRouteSlug
  label: string
  dummyCategories: string[]
}

const route = useRoute()
const products = ref<Product[]>([])
const search = ref("")

const routeCategories: RouteCategory[] = [
  { slug: "men", label: "Men", dummyCategories: ["mens-shirts", "mens-shoes", "mens-watches"] },
  { slug: "women", label: "Women", dummyCategories: ["tops", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"] },
  { slug: "tech", label: "Tech", dummyCategories: ["laptops", "mobile-accessories", "smartphones", "tablets"] },
  { slug: "lifestyle", label: "Lifestyle", dummyCategories: ["beauty", "fragrances", "furniture", "groceries", "home-decoration", "kitchen-accessories", "skin-care", "sports-accessories", "sunglasses", "vehicle"] }
]

const routeCategoryMap: Record<CategoryRouteSlug, string[]> = {
  men: ["mens-shirts", "mens-shoes", "mens-watches"],
  women: ["tops", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"],
  tech: ["laptops", "mobile-accessories", "smartphones", "tablets"],
  lifestyle: ["beauty", "fragrances", "furniture", "groceries", "home-decoration", "kitchen-accessories", "skin-care", "sports-accessories", "sunglasses", "vehicle"]
}

onMounted(async () => {
  const productData = await getProducts()
  products.value = productData.products
})

const activeCategoryKey = computed<CategoryRouteSlug | "">(() => {
  const slug = route.params.slug

  if (typeof slug !== "string") {
    return ""
  }

  return slug in routeCategoryMap ? (slug as CategoryRouteSlug) : ""
})

const activeDummyCategories = computed<string[]>(() => {
  if (!activeCategoryKey.value) {
    return []
  }

  return routeCategoryMap[activeCategoryKey.value]
})

const activeCategoryLabel = computed(() => {
  if (!activeCategoryKey.value) {
    return "All"
  }

  return routeCategories.find((category) => category.slug === activeCategoryKey.value)?.label || "All"
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
</script>
