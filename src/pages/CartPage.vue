<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { useToast } from "../composables/useToast"
import { ROUTES, getProductDetailRoute } from "../router/routes"
import { useAuthStore } from "../stores/authStore"
import { useCartStore } from "../stores/cartStore"
import { buildLoginLocation } from "../utils/loginRedirect"
import { formatPrice } from "../utils/formatPrice"

const auth = useAuthStore()
const cart = useCartStore()
const route = useRoute()
const router = useRouter()
const { showToast } = useToast()

function handleDecreaseQuantity(id: number, quantity: number) {
  cart.updateQuantity(id, quantity - 1)
}

function handleIncreaseQuantity(id: number, quantity: number) {
  cart.updateQuantity(id, quantity + 1)
}

function handleProceedToCheckout() {
  if (auth.isLoggedIn) {
    router.push(ROUTES.checkout)
    return
  }

  router.push(buildLoginLocation(route.fullPath))
}

function handleRemoveFromCart(id: number) {
  cart.removeFromCart(id)
  showToast("Removed from cart")
}

function handleClearCart() {
  cart.clearCart()
  showToast("Cart cleared")
}
</script>

<template>
  <section class="vybe-page space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8">
    <div class="vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8">
      <div class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div class="space-y-2.5 sm:space-y-3 md:space-y-4">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Your cart</p>
          <h1 class="vybe-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
            Review what is coming home with you.
          </h1>
          <p class="max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
            Adjust quantities, check totals, and keep the checkout flow feeling polished across every screen size.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-3">
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Items</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ cart.itemCount }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Lines</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ cart.items.length }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Total</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ formatPrice(cart.totalPrice) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cart.items.length === 0" class="vybe-empty px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <p class="vybe-display text-2xl sm:text-3xl md:text-4xl text-[color:var(--text)]">Your cart is empty.</p>
      <p class="mx-auto mt-2 sm:mt-3 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base md:leading-8">
        Explore the collection and add a few standout pieces to see them here.
      </p>
      <RouterLink :to="ROUTES.products" class="vybe-button vybe-touch-target mt-4 inline-flex rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm">
        Browse Products
      </RouterLink>
    </div>

    <div v-else class="grid gap-5 sm:gap-6 md:gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6">
        <div class="space-y-3 sm:space-y-4 md:space-y-5">
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="vybe-card rounded-[1.75rem] p-3 sm:p-4 md:p-5"
          >
            <div class="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div class="min-w-0">
                <p class="vybe-kicker text-[9px] sm:text-[10px]">{{ item.category }}</p>
                <RouterLink :to="getProductDetailRoute(item.id)" class="mt-1 sm:mt-2 block text-lg font-semibold text-[color:var(--text)] transition hover:text-[color:var(--accent)] sm:text-xl md:text-2xl">
                  {{ item.title }}
                </RouterLink>
                <p class="mt-1.5 sm:mt-2 text-xs text-[color:var(--muted)] sm:text-sm">{{ formatPrice(item.price) }} each</p>
              </div>

              <div class="grid gap-2 sm:gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-end">
                <div class="vybe-field">
                  <span class="vybe-label text-[9px] sm:text-[10px]">Qty</span>
                  <div class="flex items-center rounded-[1rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_76%,transparent)]">
                    <button
                      type="button"
                      class="vybe-touch-target inline-flex min-h-10 min-w-10 items-center justify-center rounded-l-[1rem] px-3 text-base text-[color:var(--text)] transition hover:bg-[color:var(--accent-soft)] sm:min-h-12 sm:min-w-12 sm:text-lg"
                      aria-label="Decrease quantity"
                      @click="handleDecreaseQuantity(item.id, item.quantity)"
                    >
                      -
                    </button>
                    <span class="inline-flex min-h-10 min-w-[2.75rem] items-center justify-center px-2 text-sm font-medium text-[color:var(--text)] sm:min-h-12 sm:min-w-[3.25rem] sm:text-base">
                      {{ item.quantity }}
                    </span>
                    <button
                      type="button"
                      class="vybe-touch-target inline-flex min-h-10 min-w-10 items-center justify-center rounded-r-[1rem] px-3 text-base text-[color:var(--text)] transition hover:bg-[color:var(--accent-soft)] sm:min-h-12 sm:min-w-12 sm:text-lg"
                      aria-label="Increase quantity"
                      @click="handleIncreaseQuantity(item.id, item.quantity)"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div class="vybe-field">
                  <span class="vybe-label text-[9px] sm:text-[10px]">Line</span>
                  <p class="rounded-[1rem] border border-[color:var(--line)] px-3 py-2 text-xs font-medium text-[color:var(--text)] sm:px-4 sm:py-3 sm:text-sm">
                    {{ formatPrice(item.price * item.quantity) }}
                  </p>
                </div>

                <button
                  @click="handleRemoveFromCart(item.id)"
                  class="vybe-danger-button vybe-touch-target self-end rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em] sm:px-4 sm:py-3 sm:text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="vybe-panel h-fit rounded-[2rem] p-4 sm:p-5 md:p-6">
        <p class="vybe-kicker text-[10px] sm:text-[11px]">Order summary</p>
        <h2 class="vybe-display mt-2 sm:mt-3 text-2xl sm:text-3xl text-[color:var(--text)]">Ready when you are.</h2>

        <div class="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <div class="flex items-center justify-between text-xs sm:text-sm text-[color:var(--muted)]">
            <span>Products</span>
            <span class="text-[color:var(--text)]">{{ cart.items.length }}</span>
          </div>
          <div class="flex items-center justify-between text-xs sm:text-sm text-[color:var(--muted)]">
            <span>Quantity</span>
            <span class="text-[color:var(--text)]">{{ cart.itemCount }}</span>
          </div>
          <div class="vybe-divider pt-3 sm:pt-4">
            <div class="flex items-center justify-between">
              <span class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Total</span>
              <span class="text-2xl sm:text-3xl text-[color:var(--accent)]">{{ formatPrice(cart.totalPrice) }}</span>
            </div>
          </div>
        </div>

        <button
          @click="handleProceedToCheckout"
          class="vybe-button vybe-touch-target mt-4 w-full rounded-full px-4 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-5 sm:py-3"
        >
          Proceed to Checkout
        </button>

        <button
          @click="handleClearCart"
          class="vybe-danger-button vybe-touch-target mt-3 w-full rounded-full px-4 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-4 sm:px-5 sm:py-3"
        >
          Clear Cart
        </button>
      </aside>
    </div>
  </section>
</template>
