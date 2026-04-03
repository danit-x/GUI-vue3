<script setup lang="ts">
import { computed } from "vue"
import type { Product } from "../../types/product"
import { useBookmarkStore } from "../../stores/bookmarkStore"
import ProductCard from "./ProductCard.vue"

const props = defineProps<{
  products: Product[]
}>()

const bookmarks = useBookmarkStore()

const bookmarkedProductIds = computed(() => new Set(bookmarks.items.map((item) => item.id)))
</script>

<template>
  <div class="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6 xl:grid-cols-3">
    <div
      v-for="(product, index) in props.products"
      :key="product.id"
      v-memo="[product.id, bookmarkedProductIds.has(product.id)]"
      :style="{ '--delay': `${index * 70}ms` }"
      class="vybe-reveal"
    >
      <ProductCard
        :product="product"
        :is-bookmarked="bookmarkedProductIds.has(product.id)"
      />
    </div>
  </div>
</template>
