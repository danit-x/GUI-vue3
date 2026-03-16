<script setup>
import Navbar from './components/layout/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white">
    <Navbar />

    <main class="p-6">
      <transition name="fade" mode="out-in">
        <RouterView />
      </transition>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}</style>


