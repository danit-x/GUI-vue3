<script setup>
import Navbar from "./components/layout/Navbar.vue"
</script>

<template>
  <div class="vybe-shell">
    <div class="relative z-10 min-h-screen">
      <Navbar />

      <main class="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <transition name="fade" mode="out-in">
          <RouterView />
        </transition>
      </main>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
