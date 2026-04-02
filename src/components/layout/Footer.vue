<script setup lang="ts">
import { computed } from "vue"
import { countryOptions, useCountryPreference } from "../../composables/useCountryPreference"

const { selectedCountry, setCountry } = useCountryPreference()

const selectedCountryOption = computed(() => {
  return countryOptions.find((country) => country.name === selectedCountry.value) ?? { name: "", flag: "" }
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="px-4 pb-4 pt-6 sm:px-5 sm:pb-5 md:px-6 lg:px-8">
    <div class="mx-auto max-w-[84rem] rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_86%,transparent)] px-4 py-6 shadow-[var(--shadow)] backdrop-blur-xl sm:px-5 sm:py-7 md:px-6 md:py-8">

      <!-- Top row: brand + nav columns -->
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-6">

        <!-- Brand -->
        <div class="max-w-xs">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">VYBE House</p>
          <p class="vybe-display mt-2 text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] text-[color:var(--text)] sm:mt-3">
            Objects with presence.
          </p>
          <p class="mt-3 text-xs leading-6 text-[color:var(--muted)] sm:mt-4 sm:text-sm sm:leading-7">
            A refined storefront for modern essentials — styled with the calm of an editorial spread.
          </p>
        </div>

        <!-- Shop links -->
        <div>
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Shop</p>
          <ul class="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            <li><RouterLink to="/products" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">All Products</RouterLink></li>
            <li><RouterLink to="/category/men" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Men</RouterLink></li>
            <li><RouterLink to="/category/women" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Women</RouterLink></li>
            <li><RouterLink to="/category/tech" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Tech</RouterLink></li>
            <li><RouterLink to="/category/lifestyle" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Lifestyle</RouterLink></li>
          </ul>
        </div>

        <!-- Account links -->
        <div>
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Account</p>
          <ul class="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            <li><RouterLink to="/profile" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Profile</RouterLink></li>
            <li><RouterLink to="/wishlist" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Wishlist</RouterLink></li>
            <li><RouterLink to="/cart" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Cart</RouterLink></li>
            <li><RouterLink to="/login" class="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] transition hover:text-[color:var(--text)] sm:text-sm">Sign In</RouterLink></li>
          </ul>
        </div>

        <!-- Country selector -->
        <div class="flex flex-col gap-3">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Region</p>
          <label class="flex min-w-0 items-center gap-2 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_74%,transparent)] px-3 py-2.5 sm:px-4 sm:py-3">
            <span class="text-base text-[color:var(--text)]">{{ selectedCountryOption.flag }}</span>
            <select
              :value="selectedCountry"
              class="min-w-0 flex-1 bg-transparent text-xs uppercase tracking-[0.16em] text-[color:var(--text)] outline-none sm:text-sm"
              @change="setCountry(($event.target as HTMLSelectElement).value)"
            >
              <option
                v-for="country in countryOptions"
                :key="country.name"
                :value="country.name"
                class="bg-[color:var(--bg-strong)] text-[color:var(--text)]"
              >
                {{ country.flag }} {{ country.name }}
              </option>
            </select>
          </label>

          <p class="text-[10px] leading-5 text-[color:var(--muted)] sm:text-xs sm:leading-6">
            Prices and availability may vary based on your selected region.
          </p>
        </div>
      </div>

      <!-- Divider -->
      <div class="vybe-divider mt-6 sm:mt-8" />

      <!-- Bottom row: copyright + legal links -->
      <div class="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">
          © {{ currentYear }} VYBE House. All rights reserved.
        </p>
        <div class="flex flex-wrap gap-x-5 gap-y-2">
          <span class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">Privacy Policy</span>
          <span class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">Terms of Use</span>
          <span class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">Cookie Settings</span>
        </div>
      </div>

    </div>
  </footer>
</template>
