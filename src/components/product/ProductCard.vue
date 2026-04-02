<script setup lang="ts">
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

function openProduct() {
  router.push(`/product/${props.product.id}`)
}

function handleAddToCart() {
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
    class="vybe-panel group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2.1rem] p-2 transition duration-300 hover:-translate-y-1 sm:p-3"
  >
    <div class="relative overflow-hidden rounded-[1.75rem]">
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />
      <img
        :src="props.product.thumbnail"
        :alt="props.product.title"
        loading="lazy"
        class="aspect-[4/3] w-full rounded-[1.75rem] object-cover transition duration-500 group-hover:scale-[1.04]"
      />
    </div>

    <div class="flex flex-1 flex-col space-y-3 p-3 sm:space-y-4 sm:p-4 md:p-5">
      <div class="flex items-start justify-between gap-3 sm:gap-4">
        <div class="min-w-0">
          <p class="vybe-kicker text-[9px] sm:text-[10px]">
            {{ props.product.category }}
          </p>
          <h2 class="vybe-display mt-1.5 line-clamp-2 text-xl leading-tight sm:mt-2 sm:text-2xl md:text-3xl">
            {{ props.product.title }}
          </h2>
        </div>

        <div class="shrink-0 rounded-full border border-[color:var(--line)] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[color:var(--muted)] sm:px-3 sm:text-[10px]">
          {{ props.product.brand }}
        </div>
      </div>

      <p class="line-clamp-2 text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7">
        {{ props.product.description }}
      </p>

      <div class="flex items-center justify-between gap-2.5 text-xs text-[color:var(--muted)] sm:gap-3 sm:text-sm">
        <span>Rating {{ props.product.rating }}</span>
        <span class="text-lg text-[color:var(--accent)] sm:text-xl">{{ formatPrice(props.product.price || 0) }}</span>
      </div>

      <div class="mt-auto flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center">
        <button
          @click.stop="handleAddToCart"
          class="vybe-button vybe-touch-target rounded-full px-3 py-2.5 text-xs uppercase tracking-[0.2em] sm:px-4 sm:py-3 md:flex-1"
        >
          Add To Cart
        </button>

        <button
          @click.stop="handleToggleBookmark"
          class="vybe-touch-target rounded-full border border-[color:var(--line)] px-3 py-2.5 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-4 sm:py-3 md:flex-1"
        >
          {{ props.isBookmarked ? "Saved" : "Bookmark" }}
        </button>
      </div>
    </div>
  </article>
</template>
