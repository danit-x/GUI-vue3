<script setup lang="ts">
import { useBookmarkStore } from "../stores/bookmarkStore"

const bookmarks = useBookmarkStore()
</script>

<template>
  <section class="vybe-page space-y-8">
    <div class="vybe-hero rounded-[2.4rem] p-6 sm:p-8">
      <div class="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div class="space-y-3">
          <p class="vybe-kicker">Saved pieces</p>
          <h1 class="vybe-display text-4xl leading-none sm:text-5xl lg:text-6xl">
            Keep the strongest finds close.
          </h1>
          <p class="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Your wishlist should feel as curated as the storefront itself, with clear hierarchy and roomy spacing on every device.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="vybe-stat">
            <p class="vybe-kicker">Saved items</p>
            <p class="mt-3 text-2xl text-[color:var(--text)]">{{ bookmarks.count }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker">Status</p>
            <p class="mt-3 text-2xl text-[color:var(--text)]">{{ bookmarks.count ? "Active" : "Empty" }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bookmarks.items.length === 0" class="vybe-empty px-6 py-14 sm:px-8">
      <p class="vybe-display text-3xl text-[color:var(--text)] sm:text-4xl">No saved items yet.</p>
      <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
        Bookmark products you want to revisit and they will appear here in a cleaner, easier-to-scan list.
      </p>
      <RouterLink to="/products" class="vybe-button mt-6 inline-flex rounded-full px-6 py-3 text-sm uppercase tracking-[0.22em]">
        Explore Products
      </RouterLink>
    </div>

    <div v-else class="vybe-panel rounded-[2rem] p-4 sm:p-6">
      <div class="grid gap-4">
        <div
          v-for="item in bookmarks.items"
          :key="item.id"
          class="vybe-card rounded-[1.75rem] p-4 sm:p-5"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="vybe-kicker">{{ item.category }}</p>
              <RouterLink :to="`/product/${item.id}`" class="mt-2 block text-xl font-semibold text-[color:var(--text)] transition hover:text-[color:var(--accent)] sm:text-2xl">
                {{ item.title }}
              </RouterLink>
              <p class="mt-2 text-sm text-[color:var(--muted)]">${{ item.price }}</p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <RouterLink
                :to="`/product/${item.id}`"
                class="vybe-pill rounded-full px-5 py-3 text-center text-xs uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
              >
                View Product
              </RouterLink>

              <button
                @click="bookmarks.removeBookmark(item.id)"
                class="rounded-full border border-[color:var(--line)] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:border-red-500/40 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
