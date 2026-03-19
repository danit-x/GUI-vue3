<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cartStore"
import { useBookmarkStore } from "../stores/bookmarkStore"
import type { Product } from "../types/product"

const route = useRoute()
const cart = useCartStore()
const bookmarks = useBookmarkStore()

const product = ref<Product | null>(null)
const loading = ref(true)

async function loadProduct(id: number) {
  loading.value = true
  product.value = await getProductById(id)
  loading.value = false
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
  <div v-if="loading" class="mx-auto max-w-6xl px-6 py-10 text-zinc-400">
    Loading product...
  </div>

  <div v-else-if="product" class="max-w-6xl mx-auto px-6 py-10">
    <div class="grid gap-10 md:grid-cols-2">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="rounded-xl"
      />

      <div>
        <h1 class="mb-4 text-4xl font-bold">
          {{ product.title }}
        </h1>

        <p class="mb-4 text-zinc-400">
          {{ product.description }}
        </p>

        <p class="mb-4 text-yellow-400">
          ★ {{ product.rating }}
        </p>

        <p class="mb-6 text-2xl font-bold text-purple-400">
          ${{ product.price }}
        </p>

        <div class="flex gap-2">
          <button
            @click="cart.addToCart(product)"
            class="rounded-lg bg-purple-600 px-6 py-3 transition hover:bg-purple-500"
          >
            Add to Cart
          </button>

          <button
            @click="bookmarks.toggleBookmark(product)"
            class="rounded-lg border border-yellow-400 px-6 py-3 text-yellow-400 transition hover:bg-yellow-400 hover:text-zinc-950"
          >
            {{ bookmarks.isBookmarked(product.id) ? "Remove Bookmark" : "Save Bookmark" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
