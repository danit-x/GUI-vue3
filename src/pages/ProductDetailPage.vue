<script setup lang="ts">
import { ref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cartStore"
import { useBookmarkStore } from "../stores/bookmarkStore"
import type { Product } from "../types/product"

const route = useRoute()
const cart = useCartStore()
const bookmarks = useBookmarkStore()

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

watch(
  () => route.params.id,
  (id) => {
    loadProduct(Number(id))
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="loading" class="mx-auto max-w-6xl px-4 py-8 text-[color:var(--muted)] sm:px-6">
    Loading product...
  </div>

  <div
    v-else-if="error"
    class="vybe-panel mx-auto max-w-6xl rounded-[2rem] px-6 py-10 text-center text-[color:var(--muted)]"
  >
    {{ error }}
  </div>

  <div v-else-if="product" class="mx-auto max-w-6xl py-4 sm:py-8">
    <div class="mb-4">
      <RouterLink
        to="/products"
        class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
      >
        Back to products
      </RouterLink>
    </div>

    <div class="vybe-panel grid gap-6 rounded-[2.25rem] p-4 sm:gap-8 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:p-8">
      <div class="space-y-4">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          loading="lazy"
          class="h-72 w-full rounded-[1.8rem] object-cover sm:h-96"
        />

        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div class="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-4">
            <p class="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Brand</p>
            <p class="mt-2 text-sm sm:text-base">{{ product.brand }}</p>
          </div>
          <div class="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-4">
            <p class="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Category</p>
            <p class="mt-2 text-sm sm:text-base">{{ product.category }}</p>
          </div>
          <div class="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-4">
            <p class="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Stock</p>
            <p class="mt-2 text-sm sm:text-base">{{ product.stock }}</p>
          </div>
          <div class="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-4">
            <p class="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Discount</p>
            <p class="mt-2 text-sm sm:text-base">{{ product.discountPercentage }}%</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-center">
        <p class="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
          Product detail
        </p>
        <h1 class="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
          {{ product.title }}
        </h1>

        <p class="mt-4 text-sm leading-7 text-[color:var(--muted)] sm:text-base">
          {{ product.description }}
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span class="rounded-full border border-[color:var(--line)] px-4 py-2 text-[color:var(--muted)]">
            Rating {{ product.rating }}
          </span>
          <span class="rounded-full border border-[color:var(--line)] px-4 py-2 text-[color:var(--muted)]">
            {{ product.images.length }} images
          </span>
        </div>

        <p class="mt-6 text-3xl font-bold text-[color:var(--accent)] sm:text-4xl">
          ${{ product.price }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            @click="cart.addToCart(product)"
            class="vybe-button rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em] sm:flex-1"
          >
            Add to Cart
          </button>

          <button
            @click="bookmarks.toggleBookmark(product)"
            class="rounded-full border border-[color:var(--line)] px-6 py-3 text-sm uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:flex-1"
          >
            {{ bookmarks.isBookmarked(product.id) ? "Remove Bookmark" : "Save Bookmark" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
