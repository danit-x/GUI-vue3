<script setup lang="ts">
import { useCartStore } from "../stores/cartStore"

const cart = useCartStore()
</script>

<template>
  <div class="max-w-5xl mx-auto py-10">

    <h1 class="text-4xl font-bold mb-8">
      Your Cart
    </h1>

    <div v-if="cart.items.length === 0">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">

      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex justify-between items-center border-b border-zinc-700 pb-4"
      >

        <div>
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-zinc-400">${{ item.price }}</p>
        </div>

        <button
          @click="cart.removeFromCart(item.id)"
          class="text-red-400"
        >
          Remove
        </button>

      </div>

      <button
        @click="cart.clearCart()"
        class="mt-6 bg-red-600 px-6 py-2 rounded"
      >
        Clear Cart
      </button>

    </div>

  </div>
</template>