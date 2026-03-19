<script setup lang="ts">
import { useCartStore } from "../stores/cartStore"

const cart = useCartStore()

function handleQuantityChange(id: number, event: Event) {
  const target = event.target as HTMLInputElement
  cart.updateQuantity(id, Number(target.value))
}
</script>

<template>
  <div class="max-w-5xl mx-auto py-10">
    <h1 class="mb-8 text-4xl font-bold">
      Your Cart
    </h1>

    <div v-if="cart.items.length === 0">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex items-center justify-between border-b border-zinc-700 pb-4"
      >
        <div>
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-zinc-400">${{ item.price }} each</p>
        </div>

        <div class="flex items-center gap-4">
          <input
            :value="item.quantity"
            type="number"
            min="1"
            class="w-20 rounded border border-zinc-700 bg-zinc-900 p-2"
            @input="handleQuantityChange(item.id, $event)"
          />

          <p class="w-24 text-right text-zinc-300">
            ${{ item.price * item.quantity }}
          </p>

          <button
            @click="cart.removeFromCart(item.id)"
            class="text-red-400"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between pt-4">
        <p class="text-lg font-semibold">
          Total: ${{ cart.totalPrice }}
        </p>

        <button
          @click="cart.clearCart()"
          class="mt-6 rounded bg-red-600 px-6 py-2"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>
