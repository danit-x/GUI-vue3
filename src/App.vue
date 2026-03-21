<script setup>
import Footer from "./components/layout/Footer.vue"
import Navbar from "./components/layout/Navbar.vue"
import ToastStack from "./components/ui/ToastStack.vue"
</script>

<template>
  <div class="vybe-shell">
    <div class="relative z-10 min-h-screen">
      <Navbar />

      <main class="mx-auto w-full max-w-7xl px-4 pb-8 pt-5 sm:px-5 sm:pb-10 sm:pt-6 md:px-6 md:pb-12 md:pt-6 lg:px-8 lg:pb-12 lg:pt-6">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <Suspense>
              <component :is="Component" />

              <template #fallback>
                <div class="vybe-panel rounded-[2rem] px-4 py-8 text-center text-xs text-[color:var(--muted)] sm:px-6 sm:py-10 md:px-8 md:py-12 md:text-sm">
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
