<script setup lang="ts">
import { computed } from "vue"
import { countryOptions, useCountryPreference } from "../../composables/useCountryPreference"

const { selectedCountry, setCountry } = useCountryPreference()

const selectedCountryOption = computed(() => {
  return countryOptions.find((country) => country.name === selectedCountry.value) || countryOptions[0]
})
</script>

<template>
  <footer class="px-4 pb-6 pt-6 sm:px-6 lg:px-8">
    <div class="mx-auto grid max-w-[84rem] gap-6 rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_86%,transparent)] px-5 py-8 text-sm text-[color:var(--muted)] shadow-[var(--shadow)] backdrop-blur-xl sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div class="max-w-2xl">
        <p class="vybe-kicker">VYBE House</p>
        <p class="vybe-display mt-3 text-3xl leading-none text-[color:var(--text)] sm:text-4xl">Objects with presence, presented with restraint.</p>
        <p class="mt-4 max-w-xl leading-7">
          A refined storefront for modern essentials, styled with the calm of an editorial spread and the precision of a luxury label.
        </p>
      </div>

      <div class="flex flex-col gap-5 lg:items-end">
        <label class="flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_74%,transparent)] px-4 py-3">
          <span class="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Country</span>
          <span class="text-base text-[color:var(--text)]">{{ selectedCountryOption.flag }}</span>
          <select
            :value="selectedCountry"
            class="bg-transparent text-sm uppercase tracking-[0.16em] text-[color:var(--text)] outline-none"
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

        <div class="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.28em]">
          <RouterLink to="/" class="transition hover:text-[color:var(--text)]">Home</RouterLink>
          <RouterLink to="/products" class="transition hover:text-[color:var(--text)]">Products</RouterLink>
          <RouterLink to="/profile" class="transition hover:text-[color:var(--text)]">Profile</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>
