<script setup lang="ts">
import { useBookmarkStore } from "../stores/bookmarkStore"

const bookmarks = useBookmarkStore()
</script>

<template>
  <section class="vybe-page space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8">
    <div class="vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8">
      <div class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div class="space-y-2.5 sm:space-y-3 md:space-y-4">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Saved pieces</p>
          <h1 class="vybe-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
            Keep the strongest finds close.
          </h1>
          <p class="max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
            Your wishlist should feel as curated as the storefront itself, with clear hierarchy and roomy spacing on every device.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-3">
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Saved items</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ bookmarks.count }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Status</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ bookmarks.count ? "Active" : "Empty" }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bookmarks.items.length === 0" class="vybe-empty px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <p class="vybe-display text-2xl sm:text-3xl md:text-4xl text-[color:var(--text)]">No saved items yet.</p>
      <p class="mx-auto mt-2 sm:mt-3 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base md:leading-8">
        Bookmark products you want to revisit and they will appear here in a cleaner, easier-to-scan list.
      </p>
      <RouterLink to="/products" class="vybe-button vybe-touch-target mt-4 inline-flex rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm">
        Explore Products
      </RouterLink>
    </div>

    <div v-else class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6">
      <div class="grid gap-3 sm:gap-4 md:gap-5">
        <div
          v-for="item in bookmarks.items"
          :key="item.id"
          class="vybe-card rounded-[1.75rem] p-3 sm:p-4 md:p-5"
        >
          <div class="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">{{ item.category }}</p>
              <RouterLink :to="`/product/${item.id}`" class="mt-1.5 sm:mt-2 block text-lg font-semibold text-[color:var(--text)] transition hover:text-[color:var(--accent)] sm:text-xl md:text-2xl">
                {{ item.title }}
              </RouterLink>
              <p class="mt-1.5 sm:mt-2 text-xs text-[color:var(--muted)] sm:text-sm">${{ item.price }}</p>
            </div>

            <div class="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <RouterLink
                :to="`/product/${item.id}`"
                class="vybe-pill vybe-touch-target rounded-full px-4 py-2.5 text-center text-xs uppercase tracking-[0.2em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-5 sm:py-3 sm:text-xs"
              >
                View Product
              </RouterLink>

              <button
                @click="bookmarks.removeBookmark(item.id)"
                class="vybe-touch-target rounded-full border border-[color:var(--line)] px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:border-red-500/40 hover:text-red-500 sm:px-5 sm:py-3"
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
