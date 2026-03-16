<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getProducts } from "../services/productService"
import ProductGrid from "../components/product/ProductGrid.vue"
import type { Product } from "../types/product"

const products = ref<Product[]>([])

onMounted(async () => {
  const data = await getProducts()
  products.value = data.products
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-10">

    <h1 class="text-4xl font-bold mb-8">
      Shop Lifestyle & Tech
    </h1>

    <ProductGrid :products="products" />

  </div>
</template>