<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "../stores/cartStore"

const cart = useCartStore()
const router = useRouter()

const isPlacingOrder = ref(false)
const orderPlaced = ref(false)

const formattedTotalPrice = computed(() => cart.totalPrice.toFixed(2))

const summaryLabel = computed(() => {
  if (cart.items.length === 1) {
    return "1 line item"
  }

  return `${cart.items.length} line items`
})

async function handlePlaceOrder() {
  if (cart.items.length === 0 || isPlacingOrder.value) {
    return
  }

  isPlacingOrder.value = true

  try {
    await new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), 900)
    })

    cart.clearCart()
    orderPlaced.value = true
  } finally {
    isPlacingOrder.value = false
  }
}

function handleContinueShopping() {
  router.push("/products")
}
</script>

<template>
  <section class="vybe-page space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8">
    <div class="vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8">
      <div class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div class="space-y-2.5 sm:space-y-3 md:space-y-4">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Checkout</p>
          <h1 class="vybe-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
            One last look before it ships.
          </h1>
          <p class="max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
            Review your cart, confirm the total, and complete a smooth mock checkout flow with the same polish as the rest of the store.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-3">
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Lines</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ cart.items.length }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Items</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ cart.itemCount }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Total</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">${{ formattedTotalPrice }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="orderPlaced"
      class="vybe-panel rounded-[2rem] p-5 text-center sm:p-6 md:p-8"
    >
      <p class="vybe-kicker text-[10px] sm:text-[11px]">Success</p>
      <h2 class="vybe-display mt-2 text-3xl text-[color:var(--text)] sm:mt-3 sm:text-4xl">
        Order placed successfully
      </h2>
      <p class="mx-auto mt-3 max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:mt-4 sm:text-sm md:text-base md:leading-7">
        Your cart is now clear and the order flow has been completed. Keep exploring for your next standout pick.
      </p>

      <button
        class="vybe-button vybe-touch-target mt-5 rounded-full px-5 py-3 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-6 sm:text-sm"
        type="button"
        @click="handleContinueShopping"
      >
        Continue Shopping
      </button>
    </div>

    <div
      v-else-if="cart.items.length === 0"
      class="vybe-empty px-4 py-10 sm:px-6 sm:py-14 md:px-8"
    >
      <p class="vybe-display text-2xl sm:text-3xl md:text-4xl text-[color:var(--text)]">Your checkout is empty.</p>
      <p class="mx-auto mt-2 sm:mt-3 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base md:leading-8">
        Add a few products to your cart before heading back here to place an order.
      </p>
      <RouterLink
        to="/products"
        class="vybe-button vybe-touch-target mt-4 inline-flex rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
      >
        Browse Products
      </RouterLink>
    </div>

    <div v-else class="grid gap-5 sm:gap-6 md:gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="vybe-kicker text-[10px] sm:text-[11px]">Cart summary</p>
            <h2 class="vybe-display mt-2 text-2xl text-[color:var(--text)] sm:text-3xl">Everything looks set.</h2>
          </div>
          <p class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">{{ summaryLabel }}</p>
        </div>

        <div class="mt-4 grid gap-3 sm:mt-5 sm:gap-4 md:mt-6 md:gap-5">
          <article
            v-for="item in cart.items"
            :key="item.id"
            class="vybe-card rounded-[1.75rem] p-3 sm:p-4 md:p-5"
          >
            <div class="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0">
                <p class="vybe-kicker text-[9px] sm:text-[10px]">{{ item.category }}</p>
                <RouterLink
                  :to="`/product/${item.id}`"
                  class="mt-1.5 block text-lg font-semibold text-[color:var(--text)] transition hover:text-[color:var(--accent)] sm:mt-2 sm:text-xl md:text-2xl"
                >
                  {{ item.title }}
                </RouterLink>
                <p class="mt-1.5 text-xs text-[color:var(--muted)] sm:mt-2 sm:text-sm">
                  ${{ item.price.toFixed(2) }} x {{ item.quantity }}
                </p>
              </div>

              <p class="text-lg text-[color:var(--accent)] sm:text-xl">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <aside class="vybe-panel h-fit rounded-[2rem] p-4 sm:p-5 md:p-6">
        <p class="vybe-kicker text-[10px] sm:text-[11px]">Payment</p>
        <h2 class="vybe-display mt-2 sm:mt-3 text-2xl sm:text-3xl text-[color:var(--text)]">Place your order.</h2>

        <div class="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          <div class="flex items-center justify-between text-xs text-[color:var(--muted)] sm:text-sm">
            <span>Products</span>
            <span class="text-[color:var(--text)]">{{ cart.items.length }}</span>
          </div>
          <div class="flex items-center justify-between text-xs text-[color:var(--muted)] sm:text-sm">
            <span>Total quantity</span>
            <span class="text-[color:var(--text)]">{{ cart.itemCount }}</span>
          </div>
          <div class="vybe-divider pt-3 sm:pt-4">
            <div class="flex items-center justify-between">
              <span class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Total</span>
              <span class="text-2xl sm:text-3xl text-[color:var(--accent)]">${{ formattedTotalPrice }}</span>
            </div>
          </div>
        </div>

        <button
          class="vybe-button vybe-touch-target mt-4 w-full rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-6 sm:px-5 sm:py-3.5 sm:text-sm"
          type="button"
          :disabled="isPlacingOrder"
          @click="handlePlaceOrder"
        >
          {{ isPlacingOrder ? "Processing Payment..." : "Place Order" }}
        </button>

        <RouterLink
          to="/cart"
          class="vybe-pill vybe-touch-target mt-3 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:mt-4 sm:px-5 sm:py-3.5 sm:text-sm"
        >
          Back to Cart
        </RouterLink>
      </aside>
    </div>
  </section>
</template>
