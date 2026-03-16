<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore"
import { useCartStore } from "../../stores/cartStore"

const cart = useCartStore()



const auth = useAuthStore()
</script>


<template>
    <nav class="bg-zinc-950 border-b border-zinc-800 px-8 py-4 flex justify-between items-center">    <h1 class="font-bold text-xl">VYBE Store</h1>

<div class="flex gap-6 items-center">

  <RouterLink to="/products">Products</RouterLink>
  <RouterLink to="/cart">
  Cart ({{ cart.itemCount }})
</RouterLink>

  <RouterLink v-if="!auth.isLoggedIn" to="/login">
    Login
  </RouterLink>

  <button
    v-else
    @click="auth.logout()"
    class="text-red-400"
  >
    Logout
  </button>

</div>
  </nav>
</template>