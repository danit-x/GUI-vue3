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
    @click="openProduct"
    class="vybe-panel group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] p-1.5 transition duration-300 hover:-translate-y-1 sm:rounded-[2.1rem] sm:p-3"
  >
    <div class="relative overflow-hidden rounded-[1.2rem] sm:rounded-[1.75rem]">
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />
      <img
        :src="props.product.thumbnail"
        :alt="props.product.title"
        loading="lazy"
        class="aspect-[4/3] w-full rounded-[1.2rem] object-cover transition duration-500 group-hover:scale-[1.04] sm:rounded-[1.75rem]"
      />
    </div>

    <div class="flex flex-1 flex-col space-y-2 p-2 sm:space-y-4 sm:p-4 md:p-5">
      <div class="flex items-start justify-between gap-2 sm:gap-4">
        <div class="min-w-0">
          <p class="vybe-kicker text-[8px] sm:text-[10px]">
            {{ props.product.category }}
          </p>
          <h2 class="vybe-display mt-1 line-clamp-2 text-base leading-tight sm:mt-2 sm:text-2xl md:text-3xl">
            {{ props.product.title }}
          </h2>
        </div>

        <div class="shrink-0 rounded-full border border-[color:var(--line)] px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-[color:var(--muted)] sm:px-3 sm:py-1.5 sm:text-[10px]">
          {{ props.product.brand }}
        </div>
      </div>

      <div
        v-if="isOutOfStock || isLowStock"
        class="flex items-center"
      >
        <span
          class="rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.18em] sm:px-3 sm:py-1.5 sm:text-[10px]"
          :class="isOutOfStock
            ? 'border border-red-500/30 bg-red-500/12 text-red-700 dark:text-red-300'
            : 'border border-amber-500/30 bg-amber-500/12 text-amber-700 dark:text-amber-300'"
        >
          {{ isOutOfStock ? "Out of stock" : "Low stock" }}
        </span>
      </div>

      <p class="line-clamp-2 text-[11px] leading-5 text-[color:var(--muted)] sm:text-sm sm:leading-7">
        {{ props.product.description }}
      </p>

      <div class="flex items-center justify-between gap-2 text-[11px] text-[color:var(--muted)] sm:gap-3 sm:text-sm">
        <span>Rating {{ props.product.rating }}</span>
        <span class="text-base text-[color:var(--accent)] sm:text-xl">{{ formatPrice(props.product.price || 0) }}</span>
      </div>

      <div class="mt-auto flex flex-col gap-1.5 sm:gap-3 md:flex-row md:items-center">
        <button
          @click.stop="handleAddToCart"
          :disabled="isOutOfStock"
          class="vybe-button vybe-touch-target rounded-full px-2.5 py-2 text-[10px] uppercase tracking-[0.16em] sm:px-4 sm:py-3 sm:text-xs md:flex-1"
          :class="isOutOfStock ? 'opacity-60 grayscale' : ''"
        >
          {{ isOutOfStock ? "Out of Stock" : "Add To Cart" }}
        </button>

        <button
          @click.stop="handleToggleBookmark"
          class="vybe-touch-target rounded-full border border-[color:var(--line)] px-2.5 py-2 text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-4 sm:py-3 sm:text-xs md:flex-1"
        >
          {{ props.isBookmarked ? "Saved" : "Bookmark" }}
        </button>
      </div>
    </div>
  </article>
</template>
