<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cartStore"
import { useBookmarkStore } from "../stores/bookmarkStore"
import { useToast } from "../composables/useToast"
import type { Product } from "../types/product"
import { formatPrice } from "../utils/formatPrice"

const RECENTLY_VIEWED_KEY = "recently_viewed_products"
const MAX_RECENTLY_VIEWED = 6

const route = useRoute()
const cart = useCartStore()
const bookmarks = useBookmarkStore()
const { showToast } = useToast()

const product = ref<Product | null>(null)
const recentlyViewedProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref("")
const activeImage = ref("")

const productGallery = computed(() => {
  if (!product.value) {
    return []
  }

  const gallery = product.value.images.length ? product.value.images : [product.value.thumbnail]

  return Array.from(new Set([product.value.thumbnail, ...gallery]))
})

function getStoredRecentlyViewedIds() {
  return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]") as number[]
}

function storeRecentlyViewedProduct(id: number) {
  const nextIds = [id, ...getStoredRecentlyViewedIds().filter((storedId) => storedId !== id)]
    .slice(0, MAX_RECENTLY_VIEWED)

  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(nextIds))
}

async function loadRecentlyViewedProducts(currentProductId: number) {
  const recentIds = getStoredRecentlyViewedIds().filter((id) => id !== currentProductId).slice(0, MAX_RECENTLY_VIEWED - 1)

  if (recentIds.length === 0) {
    recentlyViewedProducts.value = []
    return
  }

  const recentProducts = await Promise.all(recentIds.map((id) => getProductById(id)))
  recentlyViewedProducts.value = recentProducts
}

async function loadProduct(id: number) {
  loading.value = true
  error.value = ""

  try {
    product.value = await getProductById(id)
    activeImage.value = product.value.images[0] || product.value.thumbnail
    storeRecentlyViewedProduct(product.value.id)
    await loadRecentlyViewedProducts(product.value.id)
  } catch {
    product.value = null
    recentlyViewedProducts.value = []
    activeImage.value = ""
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

function handleToggleBookmark() {
  if (!product.value) {
    return
  }

  const message = bookmarks.isBookmarked(product.value.id) ? "Removed from wishlist" : "Added to wishlist"
  bookmarks.toggleBookmark(product.value)
  showToast(message)
}

function setActiveImage(image: string) {
  activeImage.value = image
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
    <div v-if="loading" class="vybe-panel rounded-[2rem] px-4 py-12 text-center text-[color:var(--muted)] sm:px-6 sm:py-16 md:px-8">
      <div class="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <div class="vybe-spinner h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true" />
        <p class="text-xs uppercase tracking-[0.28em] sm:text-sm">Loading product...</p>
      </div>
    </div>

    <div
      v-else-if="error"
      class="vybe-empty px-4 py-10 text-xs text-[color:var(--muted)] sm:px-6 sm:py-12 md:px-8"
    >
      {{ error }}
    </div>

    <div v-else-if="product" class="space-y-4 sm:space-y-5 md:space-y-6">
      <div>
        <RouterLink
          to="/products"
          class="text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-xs"
        >
          Back to products
        </RouterLink>
      </div>

      <div class="vybe-hero grid gap-5 rounded-[2.5rem] p-4 sm:gap-6 sm:p-5 md:gap-8 md:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:p-8">
        <div class="space-y-3 sm:space-y-4">
          <div class="group overflow-hidden rounded-[2rem]">
            <img
              :src="activeImage || product.thumbnail"
              :alt="product.title"
              loading="lazy"
              class="h-[clamp(18rem,62vw,28rem)] w-full rounded-[2rem] object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>

          <div class="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <button
              v-for="image in productGallery"
              :key="image"
              type="button"
              class="overflow-hidden rounded-[1.25rem] border transition"
              :class="image === (activeImage || product.thumbnail)
                ? 'border-[color:var(--accent)]'
                : 'border-[color:var(--line)] hover:border-[color:var(--accent)]/50'"
              @click="setActiveImage(image)"
            >
              <img
                :src="image"
                :alt="`${product.title} thumbnail`"
                loading="lazy"
                class="aspect-square w-full object-cover transition duration-300 hover:scale-[1.03]"
              />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
            <div class="vybe-stat rounded-[1.5rem] p-3 sm:p-4 md:p-5">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">Brand</p>
              <p class="mt-2 sm:mt-3 text-xs text-[color:var(--text)] sm:text-sm md:text-base">{{ product.brand }}</p>
            </div>
            <div class="vybe-stat rounded-[1.5rem] p-3 sm:p-4 md:p-5">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">Category</p>
              <p class="mt-2 sm:mt-3 text-xs text-[color:var(--text)] sm:text-sm md:text-base">{{ product.category }}</p>
            </div>
            <div class="vybe-stat rounded-[1.5rem] p-3 sm:p-4 md:p-5">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">Stock</p>
              <p class="mt-2 sm:mt-3 text-xs text-[color:var(--text)] sm:text-sm md:text-base">{{ product.stock }}</p>
            </div>
            <div class="vybe-stat rounded-[1.5rem] p-3 sm:p-4 md:p-5">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">Discount</p>
              <p class="mt-2 sm:mt-3 text-xs text-[color:var(--text)] sm:text-sm md:text-base">{{ product.discountPercentage }}%</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5">
          <div>
            <p class="vybe-kicker text-[10px] sm:text-[11px]">
              Product detail
            </p>
            <h1 class="vybe-display mt-2 text-[clamp(2.5rem,7vw,5rem)] leading-[0.94] sm:mt-3">
              {{ product.title }}
            </h1>
          </div>

          <p class="text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base md:leading-8">
            {{ product.description }}
          </p>

          <div class="flex flex-wrap items-center gap-2 text-xs sm:gap-3">
            <span class="vybe-pill rounded-full px-3 py-2 sm:px-4 sm:py-2">
              Rating {{ product.rating }}
            </span>
            <span class="vybe-pill rounded-full px-3 py-2 sm:px-4 sm:py-2">
              {{ product.images.length }} images
            </span>
          </div>

          <p class="text-3xl sm:text-4xl md:text-5xl text-[color:var(--accent)]">
            {{ formatPrice(product.price) }}
          </p>

          <div class="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:gap-4">
            <button
              @click="handleAddToCart"
              class="vybe-button vybe-touch-target rounded-full px-5 py-3 text-xs uppercase tracking-[0.2em] sm:px-6 sm:py-3.5 sm:text-sm md:flex-1 md:py-4"
            >
              Add to Cart
            </button>

            <button
              @click="handleToggleBookmark"
              class="vybe-pill vybe-touch-target rounded-full px-5 py-3 text-xs uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-6 sm:py-3.5 sm:text-sm md:flex-1 md:py-4"
            >
              {{ bookmarks.isBookmarked(product.id) ? "Remove Bookmark" : "Save Bookmark" }}
            </button>
          </div>
        </div>
      </div>

      <section v-if="recentlyViewedProducts.length > 0" class="space-y-3 sm:space-y-4 md:space-y-5">
        <div class="flex items-end justify-between gap-3">
          <div>
            <p class="vybe-kicker text-[10px] sm:text-[11px]">Recently viewed</p>
            <h2 class="vybe-display mt-2 text-2xl text-[color:var(--text)] sm:text-3xl">
              Pick up where you left off.
            </h2>
          </div>
          <p class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">
            Last {{ recentlyViewedProducts.length }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          <RouterLink
            v-for="recentProduct in recentlyViewedProducts"
            :key="recentProduct.id"
            :to="`/product/${recentProduct.id}`"
            class="vybe-panel group overflow-hidden rounded-[2rem] p-2 transition duration-300 hover:-translate-y-1 sm:p-3"
          >
            <div class="overflow-hidden rounded-[1.6rem]">
              <img
                :src="recentProduct.thumbnail"
                :alt="recentProduct.title"
                loading="lazy"
                class="aspect-[4/3] w-full rounded-[1.6rem] object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>

            <div class="space-y-2.5 p-3 sm:p-4">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">{{ recentProduct.category }}</p>
              <h3 class="line-clamp-2 text-lg font-semibold text-[color:var(--text)] sm:text-xl">
                {{ recentProduct.title }}
              </h3>
              <div class="flex items-center justify-between gap-3 text-xs text-[color:var(--muted)] sm:text-sm">
                <span>Rating {{ recentProduct.rating }}</span>
                <span class="text-base text-[color:var(--accent)] sm:text-lg">{{ formatPrice(recentProduct.price) }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </section>
</template>
