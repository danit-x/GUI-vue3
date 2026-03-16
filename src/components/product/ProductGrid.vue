<script setup lang="ts">
import type { Product } from "../../types/product"
import ProductCard from "./ProductCard.vue"

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>