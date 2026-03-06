<script setup>
import Navbar from './components/layout/Navbar.vue'
</script>

<template>
<div class="min-h-screen bg-zinc-950 text-white">    
    <Navbar />

    <main class="p-6">
      <RouterView />
    </main>

  </div>
</template>


