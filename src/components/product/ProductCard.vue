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
  class="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition"
>
    <div class="overflow-hidden">
  <img
    :src="product.thumbnail"
    class="w-full h-48 object-cover transition duration-300 hover:scale-110"
  />
    </div>

    <div class="p-4">
      <h2 class="font-semibold text-lg">
        {{ product.title }}
      </h2>

      <p class="text-xs text-zinc-500 mt-1">
<span class="bg-zinc-800 px-3 py-1 rounded text-sm">
  {{ product.category }}
</span>
    </p>

    <p class="text-yellow-400 text-sm mt-2">
  ⭐ {{ product.rating }}
</p>

      <p class="text-zinc-400 text-sm mt-1">
        {{ product.brand }}
      </p>

      <div class="flex justify-between items-center mt-4">

        <span class="text-purple-400 font-bold">
          ${{ product.price }}
        </span>

        <button
  @click.stop="cart.addToCart(props.product)"
  class="bg-purple-600 px-3 py-1 rounded hover:bg-purple-500"
>
  Add
</button>
<button
 @click.stop="bookmarks.toggleBookmark(props.product)"
 class="text-yellow-400"
>
 ⭐
</button>

      </div>

    </div>

  </div>
</template>