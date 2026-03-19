<script setup>
import Footer from "./components/layout/Footer.vue"
import Navbar from "./components/layout/Navbar.vue"
import ToastStack from "./components/ui/ToastStack.vue"
</script>

<template>
  <div class="vybe-shell">
    <div class="relative z-10 min-h-screen">
      <Navbar />

      <main class="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <Suspense>
              <component :is="Component" />

              <template #fallback>
                <div class="vybe-panel rounded-[2rem] px-6 py-10 text-center text-[color:var(--muted)]">
                  Loading page...
                </div>
              </template>
            </Suspense>
          </transition>
        </RouterView>
      </main>

      <Footer />
    </div>

    <ToastStack />
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
