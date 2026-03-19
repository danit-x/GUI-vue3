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
}>()

function openProduct() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div
    @click="openProduct"
    class="cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:scale-105"
  >
    <div class="overflow-hidden">
      <img
        :src="props.product.thumbnail"
        :alt="props.product.title"
        class="h-48 w-full object-cover transition duration-300 hover:scale-110"
      />
    </div>

    <div class="p-4">
      <h2 class="text-lg font-semibold">
        {{ props.product.title }}
      </h2>

      <p class="mt-1 text-xs text-zinc-500">
        <span class="rounded bg-zinc-800 px-3 py-1 text-sm">
          {{ props.product.category }}
        </span>
      </p>

      <p class="mt-2 text-sm text-yellow-400">
        ★ {{ props.product.rating }}
      </p>

      <p class="mt-1 text-sm text-zinc-400">
        {{ props.product.brand }}
      </p>

      <div class="mt-4 flex items-center justify-between gap-2">
        <span class="font-bold text-purple-400">
          ${{ props.product.price }}
        </span>

        <div class="flex gap-2">
          <button
            @click.stop="cart.addToCart(props.product)"
            class="rounded bg-purple-600 px-3 py-1 hover:bg-purple-500"
          >
            Add
          </button>

          <button
            @click.stop="bookmarks.toggleBookmark(props.product)"
            class="text-yellow-400 hover:text-yellow-300"
          >
            {{ bookmarks.isBookmarked(props.product.id) ? "Saved" : "Save" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
