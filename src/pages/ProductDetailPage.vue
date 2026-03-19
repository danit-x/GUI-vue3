<script setup lang="ts">
import { ref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cartStore"
import { useBookmarkStore } from "../stores/bookmarkStore"
import { useToast } from "../composables/useToast"
import type { Product } from "../types/product"

const route = useRoute()
const cart = useCartStore()
const bookmarks = useBookmarkStore()
const { showToast } = useToast()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref("")

async function loadProduct(id: number) {
  loading.value = true
  error.value = ""

  try {
    product.value = await getProductById(id)
  } catch {
    product.value = null
    error.value = "We couldn't load that product."
  } finally {
    loading.value = false
  }
}

function handleAddToCart() {
  if (!product.value) {
    return
  }

  cart.addToCart(product.value)
  showToast("Added to cart")
}

watch(
  () => route.params.id,
  (id) => {
    loadProduct(Number(id))
  },
  { immediate: true }
)
</script>

<template>
  <section class="vybe-page">
    <div v-if="loading" class="vybe-panel rounded-[2rem] px-6 py-16 text-center text-[color:var(--muted)]">
      <div class="flex flex-col items-center justify-center gap-4">
        <div class="vybe-spinner h-10 w-10" aria-hidden="true" />
        <p class="text-sm uppercase tracking-[0.28em]">Loading product...</p>
      </div>
    </div>

    <div
      v-else-if="error"
      class="vybe-empty px-6 py-12 text-[color:var(--muted)]"
    >
      {{ error }}
    </div>

    <div v-else-if="product" class="space-y-5">
      <div>
        <RouterLink
          to="/products"
          class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
        >
          Back to products
        </RouterLink>
      </div>

      <div class="vybe-hero grid gap-6 rounded-[2.5rem] p-4 sm:gap-8 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:p-8">
        <div class="space-y-4">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            loading="lazy"
            class="h-72 w-full rounded-[2rem] object-cover sm:h-[28rem]"
          />

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div class="vybe-stat">
              <p class="vybe-kicker">Brand</p>
              <p class="mt-3 text-sm text-[color:var(--text)] sm:text-base">{{ product.brand }}</p>
            </div>
            <div class="vybe-stat">
              <p class="vybe-kicker">Category</p>
              <p class="mt-3 text-sm text-[color:var(--text)] sm:text-base">{{ product.category }}</p>
            </div>
            <div class="vybe-stat">
              <p class="vybe-kicker">Stock</p>
              <p class="mt-3 text-sm text-[color:var(--text)] sm:text-base">{{ product.stock }}</p>
            </div>
            <div class="vybe-stat">
              <p class="vybe-kicker">Discount</p>
              <p class="mt-3 text-sm text-[color:var(--text)] sm:text-base">{{ product.discountPercentage }}%</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <p class="vybe-kicker">
            Product detail
          </p>
          <h1 class="vybe-display mt-3 text-4xl leading-none sm:text-5xl lg:text-6xl">
            {{ product.title }}
          </h1>

          <p class="mt-5 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {{ product.description }}
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span class="vybe-pill rounded-full px-4 py-2">
              Rating {{ product.rating }}
            </span>
            <span class="vybe-pill rounded-full px-4 py-2">
              {{ product.images.length }} images
            </span>
          </div>

          <p class="mt-7 text-4xl text-[color:var(--accent)] sm:text-5xl">
            ${{ product.price }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              @click="handleAddToCart"
              class="vybe-button rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em] sm:flex-1"
            >
              Add to Cart
            </button>

            <button
              @click="bookmarks.toggleBookmark(product)"
              class="vybe-pill rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:flex-1"
            >
              {{ bookmarks.isBookmarked(product.id) ? "Remove Bookmark" : "Save Bookmark" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
