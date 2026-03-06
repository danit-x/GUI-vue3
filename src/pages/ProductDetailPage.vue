<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getProductById } from "../services/productService"
import type { Product } from "../types/product"

const route = useRoute()

const product = ref<Product | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await getProductById(id)
})
</script>

<template>
  <div v-if="product" class="max-w-6xl mx-auto px-6 py-10">

    <div class="grid md:grid-cols-2 gap-10">

      <img
        :src="product.thumbnail"
        class="rounded-xl"
      />

      <div>

        <h1 class="text-4xl font-bold mb-4">
          {{ product.title }}
        </h1>

        <p class="text-zinc-400 mb-4">
          {{ product.description }}
        </p>

        <p class="text-yellow-400 mb-4">
          ⭐ {{ product.rating }}
        </p>

        <p class="text-purple-400 text-2xl font-bold mb-6">
          ${{ product.price }}
        </p>

        <button
          class="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-500 transition"
        >
          Add to Cart
        </button>

      </div>

    </div>

  </div>
</template>