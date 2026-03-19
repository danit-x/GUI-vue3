<script setup lang="ts">
import type { Product } from "../../types/product"
import { useRouter } from "vue-router"
import { useCartStore } from "../../stores/cartStore"
import { useBookmarkStore } from "../../stores/bookmarkStore"

const bookmarks = useBookmarkStore()
const cart = useCartStore()
const router = useRouter()

const props = defineProps<{
  product: Product
  isBookmarked: boolean
}>()

function openProduct() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <article
    @click="openProduct"
    class="vybe-panel group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] p-3 transition duration-300 hover:-translate-y-1"
  >
    <div class="relative overflow-hidden rounded-[1.6rem]">
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />
      <img
        :src="props.product.thumbnail"
        :alt="props.product.title"
        loading="lazy"
        class="h-52 w-full rounded-[1.6rem] object-cover transition duration-500 group-hover:scale-[1.04] sm:h-60 lg:h-64"
      />
    </div>

    <div class="flex flex-1 flex-col space-y-4 p-4">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-[10px] uppercase tracking-[0.35em] text-[color:var(--muted)]">
            {{ props.product.category }}
          </p>
          <h2 class="vybe-display mt-2 text-2xl leading-none sm:text-3xl">
            {{ props.product.title }}
          </h2>
        </div>

        <div class="shrink-0 rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--muted)]">
          {{ props.product.brand }}
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 text-sm text-[color:var(--muted)]">
        <span>Rating {{ props.product.rating }}</span>
        <span class="text-lg text-[color:var(--accent)]">${{ props.product.price }}</span>
      </div>

      <div class="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          @click.stop="cart.addToCart(props.product)"
          class="vybe-button rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] sm:flex-1"
        >
          Add To Cart
        </button>

        <button
          @click.stop="bookmarks.toggleBookmark(props.product)"
          class="rounded-full border border-[color:var(--line)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:flex-1"
        >
          {{ props.isBookmarked ? "Saved" : "Bookmark" }}
        </button>
      </div>
    </div>
  </article>
</template>
