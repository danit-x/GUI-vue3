<script setup lang="ts">
import { useBookmarkStore } from "../stores/bookmarkStore"

const bookmarks = useBookmarkStore()
</script>

<template>
  <div class="max-w-6xl mx-auto py-10">
    <h1 class="text-4xl font-bold mb-8">
      Wishlist
    </h1>

    <div v-if="bookmarks.items.length === 0" class="text-zinc-400">
      No saved items yet.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in bookmarks.items"
        :key="item.id"
        class="flex justify-between items-center border-b border-zinc-700 pb-4"
      >
        <div>
          <RouterLink :to="`/product/${item.id}`" class="font-semibold hover:text-purple-400">
            {{ item.title }}
          </RouterLink>

          <p class="text-zinc-400">
            ${{ item.price }}
          </p>
        </div>

        <button
          @click="bookmarks.removeBookmark(item.id)"
          class="text-red-400"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
