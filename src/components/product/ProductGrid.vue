<script setup lang="ts">
import type { Product } from "../../types/product"
import ProductCard from "./ProductCard.vue"

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :style="{ '--delay': `${index * 70}ms` }"
      class="vybe-reveal"
    />
  </div>
</template>
