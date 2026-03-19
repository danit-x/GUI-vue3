<script setup lang="ts">
import { useCartStore } from "../stores/cartStore"

const cart = useCartStore()

function handleQuantityChange(id: number, event: Event) {
  const target = event.target as HTMLInputElement
  cart.updateQuantity(id, Number(target.value))
}
</script>

<template>
  <section class="vybe-page space-y-8">
    <div class="vybe-hero rounded-[2.4rem] p-6 sm:p-8">
      <div class="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div class="space-y-3">
          <p class="vybe-kicker">Your cart</p>
          <h1 class="vybe-display text-4xl leading-none sm:text-5xl lg:text-6xl">
            Review what is coming home with you.
          </h1>
          <p class="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Adjust quantities, check totals, and keep the checkout flow feeling polished across every screen size.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div class="vybe-stat">
            <p class="vybe-kicker">Items</p>
            <p class="mt-3 text-2xl text-[color:var(--text)]">{{ cart.itemCount }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker">Lines</p>
            <p class="mt-3 text-2xl text-[color:var(--text)]">{{ cart.items.length }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker">Total</p>
            <p class="mt-3 text-2xl text-[color:var(--text)]">${{ cart.totalPrice }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cart.items.length === 0" class="vybe-empty px-6 py-14 sm:px-8">
      <p class="vybe-display text-3xl text-[color:var(--text)] sm:text-4xl">Your cart is empty.</p>
      <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
        Explore the collection and add a few standout pieces to see them here.
      </p>
      <RouterLink to="/products" class="vybe-button mt-6 inline-flex rounded-full px-6 py-3 text-sm uppercase tracking-[0.22em]">
        Browse Products
      </RouterLink>
    </div>

    <div v-else class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div class="vybe-panel rounded-[2rem] p-4 sm:p-6">
        <div class="space-y-4">
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="vybe-card rounded-[1.75rem] p-4 sm:p-5"
          >
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div class="min-w-0">
                <p class="vybe-kicker">{{ item.category }}</p>
                <RouterLink :to="`/product/${item.id}`" class="mt-2 block text-xl font-semibold text-[color:var(--text)] transition hover:text-[color:var(--accent)] sm:text-2xl">
                  {{ item.title }}
                </RouterLink>
                <p class="mt-2 text-sm text-[color:var(--muted)]">${{ item.price }} each</p>
              </div>

              <div class="grid gap-3 sm:grid-cols-[auto_auto_auto] sm:items-center">
                <label class="vybe-field">
                  <span class="vybe-label">Quantity</span>
                  <input
                    :value="item.quantity"
                    type="number"
                    min="1"
                    class="vybe-input w-full rounded-[1rem] px-4 py-3 sm:w-24"
                    @input="handleQuantityChange(item.id, $event)"
                  />
                </label>

                <div class="vybe-field">
                  <span class="vybe-label">Line total</span>
                  <p class="rounded-[1rem] border border-[color:var(--line)] px-4 py-3 text-sm font-medium text-[color:var(--text)]">
                    ${{ item.price * item.quantity }}
                  </p>
                </div>

                <button
                  @click="cart.removeFromCart(item.id)"
                  class="self-end rounded-full border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:border-red-500/40 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="vybe-panel h-fit rounded-[2rem] p-5 sm:p-6">
        <p class="vybe-kicker">Order summary</p>
        <h2 class="vybe-display mt-3 text-3xl text-[color:var(--text)]">Ready when you are.</h2>

        <div class="mt-6 space-y-4">
          <div class="flex items-center justify-between text-sm text-[color:var(--muted)]">
            <span>Products</span>
            <span class="text-[color:var(--text)]">{{ cart.items.length }}</span>
          </div>
          <div class="flex items-center justify-between text-sm text-[color:var(--muted)]">
            <span>Quantity</span>
            <span class="text-[color:var(--text)]">{{ cart.itemCount }}</span>
          </div>
          <div class="vybe-divider pt-4">
            <div class="flex items-center justify-between">
              <span class="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">Total</span>
              <span class="text-3xl text-[color:var(--accent)]">${{ cart.totalPrice }}</span>
            </div>
          </div>
        </div>

        <button
          @click="cart.clearCart()"
          class="mt-6 w-full rounded-full border border-red-500/25 px-5 py-3 text-xs uppercase tracking-[0.22em] text-red-600 transition hover:bg-red-500/10 dark:text-red-300"
        >
          Clear Cart
        </button>
      </aside>
    </div>
  </section>
</template>
