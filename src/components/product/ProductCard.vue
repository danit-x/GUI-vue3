<script setup lang="ts">
import type { Product } from "../../types/product"

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">

    <img
      :src="product.thumbnail"
      class="w-full h-48 object-cover"
    />

    <div class="p-4">
      <h2 class="font-semibold text-lg">
        {{ product.title }}
      </h2>

      <p class="text-zinc-400 text-sm mt-1">
        {{ product.brand }}
      </p>

      <div class="flex justify-between items-center mt-4">

        <span class="text-purple-400 font-bold">
          ${{ product.price }}
        </span>

        <button
          class="bg-purple-600 px-3 py-1 rounded hover:bg-purple-500"
        >
          Add
        </button>

      </div>

    </div>

  </div>
</template>