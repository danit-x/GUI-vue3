<template>
  <input
  v-model="search"
  placeholder="Search products..."
  class="w-full mb-6 p-3 bg-zinc-900 border border-zinc-700 rounded"
/>

<div class="flex gap-4 mb-8 flex-wrap">

  <button
    @click="selectedCategory = ''"
    class="px-4 py-2 bg-zinc-800 rounded"
  >
    All
  </button>

  <button
    v-for="cat in categories"
    :key="cat"
    @click="selectedCategory = cat"
    class="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
  >
    {{ cat }}
  </button>

</div>


</template>




<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { getProducts, getCategories } from "../services/productService"
import ProductGrid from "../components/product/ProductGrid.vue"
import type { Product } from "../types/product"

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const search = ref("")
const selectedCategory = ref("")

onMounted(async () => {
  const productData = await getProducts()
  products.value = productData.products

  categories.value = await getCategories()
})

const filteredProducts = computed(() => {
  return products.value.filter((p) => {

    const matchesSearch =
      p.title.toLowerCase().includes(search.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === "" ||
      p.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})
</script>