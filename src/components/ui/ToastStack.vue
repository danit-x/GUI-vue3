<script setup lang="ts">
import { useToast } from "../../composables/useToast"

const { toasts, dismissToast } = useToast()
</script>

<template>
  <div class="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-3 sm:inset-x-auto sm:right-6 sm:items-end">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--bg-elevated)] px-4 py-3 text-sm text-[color:var(--text)] shadow-[0_18px_48px_rgba(26,17,12,0.18)] backdrop-blur-xl"
      >
        <span class="font-medium">{{ toast.message }}</span>
        <button
          type="button"
          class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
          @click="dismissToast(toast.id)"
        >
          Close
        </button>
      </div>
    </transition-group>
  </div>
</template>
