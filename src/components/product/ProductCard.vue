<script setup lang="ts">
import { computed } from "vue"
import { getProductDetailRoute } from "../../router/routes"
import type { Product } from "../../types/product"
import { useRouter } from "vue-router"
import { useCartStore } from "../../stores/cartStore"
import { useBookmarkStore } from "../../stores/bookmarkStore"
import { useToast } from "../../composables/useToast"
import { formatPrice } from "../../utils/formatPrice"

const bookmarks = useBookmarkStore()
const cart = useCartStore()
const router = useRouter()
const { showToast } = useToast()

const props = defineProps<{
  product: Product
  isBookmarked: boolean
}>()

const isOutOfStock = computed(() => props.product.stock === 0)
const isLowStock = computed(() => props.product.stock > 0 && props.product.stock < 10)

function openProduct() {
  router.push(getProductDetailRoute(props.product.id))
}

function handleAddToCart() {
  if (isOutOfStock.value) {
    return
  }

  cart.addToCart(props.product)
  showToast("Added to cart")
}

function handleToggleBookmark() {
  const message = props.isBookmarked ? "Removed from wishlist" : "Added to wishlist"
  bookmarks.toggleBookmark(props.product)
  showToast(message)
}
</script>

<template>
  <article
    class="product-card vybe-panel group flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[1.25rem] p-2 transition duration-300 hover:-translate-y-1 sm:rounded-[1.75rem] sm:p-3 md:rounded-[2.1rem]"
    @click="openProduct"
  >
    <div class="relative min-w-0 overflow-hidden rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[1.75rem]">
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />
      <img
        :src="props.product.thumbnail"
        :alt="props.product.title"
        loading="lazy"
        class="aspect-[4/3] w-full rounded-[1rem] object-cover transition duration-500 group-hover:scale-[1.04] sm:rounded-[1.5rem] md:rounded-[1.75rem]"
      />
    </div>

    <div class="flex min-w-0 flex-1 flex-col gap-2 p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4 lg:p-5">
      <div class="min-w-0 space-y-1 sm:space-y-1.5">
        <div class="flex min-w-0 items-center justify-between gap-2">
          <p class="vybe-kicker min-w-0 truncate text-[10px] sm:text-[11px]">
            {{ props.product.category }}
          </p>
          <span
            v-if="isOutOfStock || isLowStock"
            class="shrink-0 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] sm:px-2.5 sm:py-1 sm:text-[10px]"
            :class="isOutOfStock ? 'vybe-badge-danger' : 'vybe-badge-warning'"
          >
            {{ isOutOfStock ? "Out" : "Low" }}
          </span>
        </div>

        <h2 class="vybe-display line-clamp-2 text-base leading-tight sm:text-lg md:text-xl lg:text-2xl">
          {{ props.product.title }}
        </h2>

        <p class="truncate text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)] sm:text-[11px]">
          {{ props.product.brand }}
        </p>
      </div>

      <p class="hidden line-clamp-2 text-xs leading-5 text-[color:var(--muted)] md:block md:text-sm md:leading-6">
        {{ props.product.description }}
      </p>

      <div class="flex min-w-0 items-center justify-between gap-2 text-xs text-[color:var(--muted)] sm:text-sm">
        <span class="shrink-0">★ {{ props.product.rating }}</span>
        <span class="truncate text-right text-base font-medium text-[color:var(--accent)] sm:text-lg md:text-xl">
          {{ formatPrice(props.product.price || 0) }}
        </span>
      </div>

      <div class="product-card-actions mt-auto grid grid-cols-2 gap-2 sm:gap-2.5">
        <button
          type="button"
          :disabled="isOutOfStock"
          class="product-card-btn vybe-button vybe-touch-target rounded-full text-[10px] uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
          :class="isOutOfStock ? 'opacity-60 grayscale' : ''"
          @click.stop="handleAddToCart"
        >
          <span class="md:hidden">{{ isOutOfStock ? "Sold out" : "Add" }}</span>
          <span class="hidden md:inline">{{ isOutOfStock ? "Out of Stock" : "Add To Cart" }}</span>
        </button>

        <button
          type="button"
          class="product-card-btn vybe-surface-link vybe-touch-target rounded-full text-[10px] uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
          @click.stop="handleToggleBookmark"
        >
          <span class="md:hidden">{{ props.isBookmarked ? "Saved" : "Save" }}</span>
          <span class="hidden md:inline">{{ props.isBookmarked ? "Saved" : "Bookmark" }}</span>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card-btn {
  min-height: 2.75rem;
  width: 100%;
  padding: 0.625rem 0.5rem;
}

@media (min-width: 640px) {
  .product-card-btn {
    padding: 0.75rem 0.75rem;
  }
}

@media (min-width: 768px) {
  .product-card-btn {
    padding: 0.75rem 1rem;
  }
}
</style>
