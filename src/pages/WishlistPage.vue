<script setup lang="ts">
import { useBookmarkStore } from "../stores/bookmarkStore"

const bookmarks = useBookmarkStore()
</script>

<template>

<div class="max-w-6xl mx-auto py-10">

<h1 class="text-4xl font-bold mb-8">
Wishlist
</h1>

<div v-if="bookmarks.items.length === 0">
No saved items yet.
</div>

<div v-else class="space-y-4">

<div
 v-for="item in bookmarks.items"
 :key="item.id"
 class="border-b border-zinc-700 pb-4"
>

<h2 class="font-semibold">
{{ item.title }}
</h2>

<p class="text-zinc-400">
${{ item.price }}
</p>

</div>

</div>

</div>

</template>