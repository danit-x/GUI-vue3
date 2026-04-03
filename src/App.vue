<script setup lang="ts">
import { onErrorCaptured, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import Footer from "./components/layout/Footer.vue"
import Navbar from "./components/layout/Navbar.vue"
import ToastStack from "./components/ui/ToastStack.vue"

const route = useRoute()
const router = useRouter()
const pageError = ref<string | null>(null)

watch(
  () => route.fullPath,
  () => {
    pageError.value = null
  }
)

onErrorCaptured((error) => {
  pageError.value = error instanceof Error ? error.message : "Something went wrong while loading this page."

  return false
})

function retryCurrentPage() {
  pageError.value = null
  router.replace({
    path: route.path,
    query: route.query,
    hash: route.hash
  })
}
</script>

<template>
  <div class="vybe-shell">
    <div class="relative z-10 min-h-screen">
      <Navbar />

      <main class="mx-auto w-full max-w-7xl px-4 pb-8 pt-5 sm:px-5 sm:pb-10 sm:pt-6 md:px-6 md:pb-12 md:pt-6 lg:px-8 lg:pb-12 lg:pt-6">
        <div v-if="pageError" class="vybe-panel rounded-[2rem] px-4 py-8 text-center sm:px-6 sm:py-10 md:px-8 md:py-12">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Page error</p>
          <h1 class="vybe-display mt-3 text-3xl text-[color:var(--text)] sm:text-4xl">This page could not load.</h1>
          <p class="mx-auto mt-3 max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base">
            {{ pageError }}
          </p>
          <button
            type="button"
            class="vybe-button vybe-touch-target mt-5 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
            @click="retryCurrentPage"
          >
            Try Again
          </button>
        </div>

        <RouterView v-else v-slot="{ Component }">
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
