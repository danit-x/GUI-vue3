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
  <section class="vybe-page space-y-8">
    <div class="vybe-hero rounded-[2.4rem] p-6 sm:p-8">
      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div class="space-y-3">
          <p class="vybe-kicker">Profile</p>
          <h1 class="vybe-display text-4xl leading-none sm:text-5xl lg:text-6xl">
            Your account at a glance.
          </h1>
          <p class="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Review your basic account details and see the country preference selected from the navbar.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="vybe-stat">
            <p class="vybe-kicker">Status</p>
            <p class="mt-3 text-2xl text-[color:var(--text)]">{{ auth.isLoggedIn ? "Signed In" : "Guest" }}</p>
          </div>
          <div class="vybe-stat">
            <p class="vybe-kicker">Country</p>
            <p class="mt-3 text-2xl text-[color:var(--text)]">{{ selectedCountry }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="auth.user" class="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside class="vybe-panel rounded-[2rem] p-6">
        <div class="flex flex-col items-center text-center">
          <div class="flex h-24 w-24 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg-strong)] text-3xl text-[color:var(--text)]">
            {{ initials }}
          </div>
          <h2 class="vybe-display mt-5 text-3xl text-[color:var(--text)]">
            {{ auth.user.firstName }} {{ auth.user.lastName }}
          </h2>
          <p class="mt-2 text-sm text-[color:var(--muted)]">@{{ auth.user.username }}</p>
        </div>
      </aside>

      <div class="vybe-panel rounded-[2rem] p-6 sm:p-8">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="vybe-card rounded-[1.5rem] p-5">
            <p class="vybe-kicker">First name</p>
            <p class="mt-3 text-lg text-[color:var(--text)]">{{ auth.user.firstName }}</p>
          </div>
          <div class="vybe-card rounded-[1.5rem] p-5">
            <p class="vybe-kicker">Last name</p>
            <p class="mt-3 text-lg text-[color:var(--text)]">{{ auth.user.lastName }}</p>
          </div>
          <div class="vybe-card rounded-[1.5rem] p-5">
            <p class="vybe-kicker">Username</p>
            <p class="mt-3 text-lg text-[color:var(--text)]">{{ auth.user.username }}</p>
          </div>
          <div class="vybe-card rounded-[1.5rem] p-5">
            <p class="vybe-kicker">Email</p>
            <p class="mt-3 break-all text-lg text-[color:var(--text)]">{{ auth.user.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="vybe-empty px-6 py-14 sm:px-8">
      <p class="vybe-display text-3xl text-[color:var(--text)] sm:text-4xl">No profile available yet.</p>
      <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
        Log in or create an account to see your basic profile details here.
      </p>
      <div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <RouterLink to="/login" class="vybe-button rounded-full px-6 py-3 text-sm uppercase tracking-[0.22em]">
          Log In
        </RouterLink>
        <RouterLink to="/signup" class="vybe-pill rounded-full px-6 py-3 text-sm uppercase tracking-[0.22em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]">
          Create Account
        </RouterLink>
      </div>
    </div>
  </section>
</template>
