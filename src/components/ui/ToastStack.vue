<script setup lang="ts">
import { useToast } from "../../composables/useToast"

const { toasts, dismissToast } = useToast()
</script>

<template>
  <div class="pointer-events-none fixed inset-x-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-4 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:items-end sm:gap-3 md:right-6">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex w-full max-w-xs items-center justify-between gap-3 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--bg-elevated)] px-4 py-3 text-xs text-[color:var(--text)] shadow-[0_18px_48px_rgba(26,17,12,0.18)] backdrop-blur-xl sm:px-5 sm:py-4 sm:text-sm md:max-w-sm"
      >
        <span class="font-medium">{{ toast.message }}</span>
        <button
          type="button"
          class="vybe-touch-target shrink-0 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
          @click="dismissToast(toast.id)"
        >
          Close
        </button>
      </div>
    </transition-group>
  </div>
</template>
