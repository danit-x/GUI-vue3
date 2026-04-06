<script setup lang="ts">
import { computed } from "vue"
import { ROUTES } from "../router/routes"
import { useRouter } from "vue-router"
import { formatPrice } from "../utils/formatPrice"
import { ORDER_SUMMARY_KEY, type OrderSummary } from "../utils/orderHistory"

const router = useRouter()
const orderSummary = computed<OrderSummary | null>(() => {
  const stored = sessionStorage.getItem(ORDER_SUMMARY_KEY)
  return stored ? JSON.parse(stored) as OrderSummary : null
})

const formattedPlacedAt = computed(() => {
  if (!orderSummary.value) {
    return ""
  }

  return new Date(orderSummary.value.placedAt).toLocaleString()
})

const progressSteps = computed(() => orderSummary.value?.progressSteps ?? [])
const currentStatus = computed(() => orderSummary.value?.status ?? "Confirmed")
const paymentMethodLabel = computed(() => orderSummary.value?.paymentMethod?.label ?? "")
const paymentMethodDetail = computed(() => orderSummary.value?.paymentMethod?.detail ?? "")
</script>

<template>
  <section class="vybe-page space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8">
    <div v-if="!orderSummary" class="vybe-empty px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <p class="vybe-display text-2xl sm:text-3xl md:text-4xl text-[color:var(--text)]">No order summary found.</p>
      <p class="mx-auto mt-2 sm:mt-3 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base md:leading-8">
        Place an order from checkout to see your confirmation details here.
      </p>
      <RouterLink :to="ROUTES.products" class="vybe-button vybe-touch-target mt-4 inline-flex rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm">
        Browse Products
      </RouterLink>
    </div>

    <template v-else>
      <div class="vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8">
        <div class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div class="space-y-2.5 sm:space-y-3 md:space-y-4">
            <p class="vybe-kicker text-[10px] sm:text-[11px]">Order confirmed</p>
            <h1 class="vybe-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
              Your order is officially in motion.
            </h1>
            <p class="max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
              We cleared the cart, saved a quick confirmation snapshot, and brought you to a proper success screen instead of leaving checkout hanging.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-3">
            <div class="vybe-stat">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">Order</p>
              <p class="mt-2 sm:mt-3 text-sm sm:text-lg text-[color:var(--text)]">{{ orderSummary.id }}</p>
            </div>
            <div class="vybe-stat">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">Items</p>
              <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ orderSummary.itemCount }}</p>
            </div>
            <div class="vybe-stat">
              <p class="vybe-kicker text-[9px] sm:text-[10px]">Total</p>
              <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ formatPrice(orderSummary.totalPrice) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-5 sm:gap-6 md:gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="vybe-kicker text-[10px] sm:text-[11px]">Order summary</p>
              <h2 class="vybe-display mt-2 text-2xl text-[color:var(--text)] sm:text-3xl">Everything you just checked out.</h2>
            </div>
            <p class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">{{ formattedPlacedAt }}</p>
          </div>

          <div class="mt-4 grid gap-3 sm:mt-5 sm:gap-4 md:mt-6 md:gap-5">
            <article
              v-for="item in orderSummary.items"
              :key="item.id"
              class="vybe-card rounded-[1.75rem] p-3 sm:p-4 md:p-5"
            >
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="min-w-0">
                  <p class="vybe-kicker text-[9px] sm:text-[10px]">Recently ordered</p>
                  <h3 class="mt-1.5 text-lg font-semibold text-[color:var(--text)] sm:text-xl">{{ item.title }}</h3>
                  <p class="mt-1.5 text-xs text-[color:var(--muted)] sm:text-sm">
                    {{ formatPrice(item.price) }} x {{ item.quantity }}
                  </p>
                </div>

                <p class="text-lg text-[color:var(--accent)] sm:text-xl">
                  {{ formatPrice(item.price * item.quantity) }}
                </p>
              </div>
            </article>
          </div>
        </div>

        <aside class="vybe-panel h-fit rounded-[2rem] p-4 sm:p-5 md:p-6">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Next move</p>
          <h2 class="vybe-display mt-2 sm:mt-3 text-2xl sm:text-3xl text-[color:var(--text)]">Track your progress.</h2>

          <div class="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
            <div class="flex items-center justify-between text-xs text-[color:var(--muted)] sm:text-sm">
              <span>Order status</span>
              <span class="text-[color:var(--text)]">{{ currentStatus }}</span>
            </div>
            <div class="flex items-center justify-between gap-3 text-xs text-[color:var(--muted)] sm:text-sm">
              <span>Payment</span>
              <span class="text-right text-[color:var(--text)]">{{ paymentMethodLabel }}</span>
            </div>
            <div class="flex items-center justify-between text-xs text-[color:var(--muted)] sm:text-sm">
              <span>Products</span>
              <span class="text-[color:var(--text)]">{{ orderSummary.items.length }}</span>
            </div>
            <div class="vybe-divider pt-3 sm:pt-4">
              <div class="flex items-center justify-between">
                <span class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Charged</span>
                <span class="text-2xl sm:text-3xl text-[color:var(--accent)]">{{ formatPrice(orderSummary.totalPrice) }}</span>
              </div>
            </div>
          </div>

          <p v-if="paymentMethodDetail" class="mt-4 text-xs leading-6 text-[color:var(--muted)] sm:text-sm">
            {{ paymentMethodDetail }}
          </p>

          <div v-if="progressSteps.length" class="mt-5 space-y-3 sm:mt-6">
            <div
              v-for="step in progressSteps"
              :key="step.label"
              class="rounded-[1.4rem] border p-3 sm:p-4"
              :class="step.state === 'complete'
                ? 'border-emerald-500/30 bg-emerald-500/10'
                : step.state === 'current'
                  ? 'border-[color:var(--accent)] bg-[color:var(--accent-soft)]'
                  : 'border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_72%,transparent)]'"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-[11px]">
                    {{ step.state === "current" ? "Current step" : step.state === "complete" ? "Done" : "Upcoming" }}
                  </p>
                  <p class="mt-1 text-sm font-semibold text-[color:var(--text)] sm:text-base">
                    {{ step.label }}
                  </p>
                  <p class="mt-1 text-xs leading-6 text-[color:var(--muted)] sm:text-sm">
                    {{ step.detail }}
                  </p>
                </div>

                <span
                  class="mt-1 inline-flex h-3.5 w-3.5 shrink-0 rounded-full"
                  :class="step.state === 'complete'
                    ? 'bg-emerald-500'
                    : step.state === 'current'
                      ? 'bg-[color:var(--accent)]'
                      : 'bg-[color:var(--line)]'"
                />
              </div>
            </div>
          </div>

          <button
            class="vybe-button vybe-touch-target mt-4 w-full rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-5 sm:py-3.5 sm:text-sm"
            type="button"
            @click="router.push(ROUTES.products)"
          >
            Continue Shopping
          </button>

          <button
            class="vybe-surface-link vybe-touch-target mt-3 w-full rounded-full px-4 py-3 text-xs uppercase tracking-[0.22em] sm:px-5 sm:py-3.5 sm:text-sm"
            type="button"
            @click="router.push(ROUTES.profile)"
          >
            View Order History
          </button>
        </aside>
      </div>
    </template>
  </section>
</template>
