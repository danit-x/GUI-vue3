<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getProducts } from "../services/productService"
import type { Product } from "../types/product"

const products = ref<Product[]>([])

onMounted(async () => {
  const data = await getProducts()
  products.value = data.products
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-3xl font-bold mb-6">Explore Your VYBE</h1>

    <ul class="space-y-2">
      <li
        v-for="product in products"
        :key="product.id"
        class="border-b border-zinc-700 py-2"
      >
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>