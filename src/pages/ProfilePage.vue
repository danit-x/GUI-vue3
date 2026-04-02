<script setup lang="ts">
import { computed } from "vue"
import { useAuthStore } from "../stores/authStore"
import { useCountryPreference } from "../composables/useCountryPreference"

const auth = useAuthStore()
const { selectedCountry } = useCountryPreference()

const initials = computed(() => {
  if (!auth.user) {
    return "VY"
  }

  return `${auth.user.firstName?.[0] || ""}${auth.user.lastName?.[0] || ""}`.toUpperCase()
})
</script>

<template>
  <section class="vybe-page space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8">
    <div class="vybe-hero rounded-[2.4rem] p-5 sm:p-6 md:p-8">
      <div class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div class="space-y-2.5 sm:space-y-3 md:space-y-4">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Profile</p>
          <h1 class="vybe-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.94]">
            Your account at a glance.
          </h1>
          <p class="max-w-2xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm md:text-base md:leading-7">
            Review your basic account details and see the country preference selected from the navbar.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-3">
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Status</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ auth.isLoggedIn ? "Signed In" : "Guest" }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Country</p>
            <p class="mt-2 sm:mt-3 text-lg sm:text-2xl text-[color:var(--text)]">{{ selectedCountry }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="auth.isLoggedIn && auth.user" class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6">
        <div class="flex flex-col items-center text-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg-strong)] text-2xl text-[color:var(--text)] sm:h-24 sm:w-24 sm:text-3xl">
            {{ initials }}
          </div>
          <h2 class="vybe-display mt-3 sm:mt-4 text-2xl sm:text-3xl text-[color:var(--text)]">
            {{ auth.user.firstName }} {{ auth.user.lastName }}
          </h2>
          <p class="mt-1.5 sm:mt-2 text-xs text-[color:var(--muted)] sm:text-sm">@{{ auth.user.username }}</p>
        </div>
      </aside>

      <div class="vybe-panel rounded-[2rem] p-4 sm:p-5 md:p-6 lg:p-8">
        <div class="grid gap-3 sm:gap-4 sm:grid-cols-2 md:gap-5">
          <div class="vybe-card rounded-[1.5rem] p-4 sm:p-5 md:p-6">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">First name</p>
            <p class="mt-2 sm:mt-3 text-base sm:text-lg text-[color:var(--text)]">{{ auth.user.firstName }}</p>
          </div>
          <div class="vybe-card rounded-[1.5rem] p-4 sm:p-5 md:p-6">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Last name</p>
            <p class="mt-2 sm:mt-3 text-base sm:text-lg text-[color:var(--text)]">{{ auth.user.lastName }}</p>
          </div>
          <div class="vybe-card rounded-[1.5rem] p-4 sm:p-5 md:p-6">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Username</p>
            <p class="mt-2 sm:mt-3 text-base sm:text-lg text-[color:var(--text)]">{{ auth.user.username }}</p>
          </div>
          <div class="vybe-card rounded-[1.5rem] p-4 sm:p-5 md:p-6">
            <p class="vybe-kicker text-[9px] sm:text-[10px]">Email</p>
            <p class="mt-2 sm:mt-3 break-all text-base sm:text-lg text-[color:var(--text)]">{{ auth.user.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="vybe-empty px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <p class="vybe-display text-2xl sm:text-3xl md:text-4xl text-[color:var(--text)]">Please log in to view your profile.</p>
      <p class="mx-auto mt-2 sm:mt-3 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base md:leading-8">
        Your account details are only available after signing in.
      </p>
      <div class="mt-4 sm:mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
      <RouterLink to="/login" class="vybe-button vybe-touch-target rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] sm:px-6 sm:py-3 sm:text-sm">
        Log In
      </RouterLink>
        <RouterLink to="/signup" class="vybe-pill vybe-touch-target rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)] sm:px-6 sm:py-3 sm:text-sm">
          Create Account
        </RouterLink>
      </div>
    </div>
  </section>
</template>
