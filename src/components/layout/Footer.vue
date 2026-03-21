<script setup lang="ts">
import { computed } from "vue"
import { countryOptions, useCountryPreference } from "../../composables/useCountryPreference"

const { selectedCountry, setCountry } = useCountryPreference()

const selectedCountryOption = computed(() => {
  return countryOptions.find((country) => country.name === selectedCountry.value) || countryOptions[0]
})
</script>

<template>
  <footer class="px-4 pb-4 pt-6 sm:px-5 sm:pb-5 md:px-6 lg:px-8">
    <div class="mx-auto grid max-w-[84rem] gap-4 rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_86%,transparent)] px-4 py-6 text-sm text-[color:var(--muted)] shadow-[var(--shadow)] backdrop-blur-xl sm:gap-5 sm:px-5 sm:py-7 md:px-6 md:gap-6 md:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,auto)] lg:items-end">
      <div class="max-w-2xl">
        <p class="vybe-kicker text-[10px] sm:text-[11px]">VYBE House</p>
        <p class="vybe-display mt-2 text-[clamp(2rem,6vw,4rem)] leading-[0.95] text-[color:var(--text)] sm:mt-3">Objects with presence, presented with restraint.</p>
        <p class="mt-3 text-xs leading-6 sm:mt-4 sm:text-sm md:max-w-xl md:leading-7">
          A refined storefront for modern essentials, styled with the calm of an editorial spread and the precision of a luxury label.
        </p>
      </div>

      <div class="flex flex-col gap-4 sm:gap-5 lg:items-end">
        <label class="flex min-w-0 flex-wrap items-center gap-2 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_74%,transparent)] px-3 py-3 sm:px-4 sm:py-3 md:gap-3 md:px-4">
          <span class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">Country</span>
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

        <div class="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-[0.28em] sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:text-xs">
          <RouterLink to="/" class="vybe-touch-target inline-flex items-center transition hover:text-[color:var(--text)]">Home</RouterLink>
          <RouterLink to="/products" class="vybe-touch-target inline-flex items-center transition hover:text-[color:var(--text)]">Products</RouterLink>
          <RouterLink to="/profile" class="vybe-touch-target inline-flex items-center transition hover:text-[color:var(--text)]">Profile</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>
