<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next"
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { countryOptions, useCountryPreference } from "../../composables/useCountryPreference"
import { ROUTES, getCategoryRoute } from "../../router/routes"
import { buildLoginLocation } from "../../utils/loginRedirect"

const { selectedCountry, setCountry } = useCountryPreference()
const route = useRoute()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const loginLocation = computed(() => buildLoginLocation(route.fullPath))

const selectedCountryOption = computed(() => {
  return countryOptions.find((country) => country.name === selectedCountry.value) ?? { name: "", flag: "" }
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectCountry(countryName: string) {
  setCountry(countryName)
  isOpen.value = false
}

function handleDocumentMouseDown(event: MouseEvent) {
  if (!dropdownRef.value) {
    return
  }

  const target = event.target

  if (target instanceof Node && !dropdownRef.value.contains(target)) {
    isOpen.value = false
  }
}

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  }
)

onMounted(() => {
  document.addEventListener("mousedown", handleDocumentMouseDown)
})

onUnmounted(() => {
  document.removeEventListener("mousedown", handleDocumentMouseDown)
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="px-4 pb-4 pt-6 sm:px-5 sm:pb-5 md:px-6 lg:px-8">
    <div class="mx-auto max-w-[84rem] rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_86%,transparent)] px-4 py-6 shadow-[var(--shadow)] backdrop-blur-xl sm:px-5 sm:py-7 md:px-6 md:py-8">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-6">
        <div class="max-w-xs">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">VYBE House</p>
          <p class="vybe-display mt-2 text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] text-[color:var(--text)] sm:mt-3">
            Objects with presence.
          </p>
          <p class="mt-3 text-xs leading-6 text-[color:var(--muted)] sm:mt-4 sm:text-sm sm:leading-7">
            A refined storefront for modern essentials, styled with the calm of an editorial spread.
          </p>
        </div>

        <div>
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Shop</p>
          <ul class="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            <li><RouterLink :to="ROUTES.products" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">All Products</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('men')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Men</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('women')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Women</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('tech')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Tech</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('lifestyle')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Lifestyle</RouterLink></li>
          </ul>
        </div>

        <div>
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Account</p>
          <ul class="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            <li><RouterLink :to="ROUTES.profile" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Profile</RouterLink></li>
            <li><RouterLink :to="ROUTES.wishlist" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Wishlist</RouterLink></li>
            <li><RouterLink :to="ROUTES.cart" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Cart</RouterLink></li>
            <li><RouterLink :to="loginLocation" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-sm">Sign In</RouterLink></li>
          </ul>
        </div>

        <div class="flex flex-col gap-3">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Region</p>

          <div ref="dropdownRef" class="relative">
            <button
              type="button"
              class="vybe-surface-link flex w-full min-w-0 items-center gap-2 rounded-[1.5rem] px-3 py-2.5 text-left sm:px-4 sm:py-3"
              :aria-expanded="isOpen"
              aria-haspopup="listbox"
              @click="toggleDropdown"
            >
              <span class="text-base text-[color:var(--text)]">{{ selectedCountryOption.flag }}</span>
              <span class="min-w-0 flex-1 truncate text-xs uppercase tracking-[0.16em] text-[color:var(--text)] sm:text-sm">
                {{ selectedCountryOption.name }}
              </span>
              <ChevronDown
                class="h-4 w-4 shrink-0 text-[color:var(--muted)] transition"
                :class="isOpen ? 'rotate-180' : ''"
              />
            </button>

            <div
              v-if="isOpen"
              class="absolute bottom-full left-0 right-0 z-20 mb-2 overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_96%,transparent)] shadow-[var(--shadow)] backdrop-blur-xl"
            >
              <div class="max-h-64 overflow-y-auto p-2">
                <button
                  v-for="country in countryOptions"
                  :key="country.name"
                  type="button"
                  class="vybe-outline-link flex w-full items-center gap-3 rounded-[1rem] px-3 py-2.5 text-left text-xs sm:text-sm hover:bg-[color:color-mix(in_srgb,var(--bg-strong)_80%,transparent)]"
                  :class="country.name === selectedCountry ? 'text-[color:var(--accent)]' : 'text-[color:var(--text)]'"
                  @click="selectCountry(country.name)"
                >
                  <span class="text-base">{{ country.flag }}</span>
                  <span class="truncate">{{ country.name }}</span>
                </button>
              </div>
            </div>
          </div>

          <p class="text-[10px] leading-5 text-[color:var(--muted)] sm:text-xs sm:leading-6">
            Prices and availability may vary based on your selected region.
          </p>
        </div>
      </div>

      <div class="vybe-divider mt-6 sm:mt-8" />

      <div class="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">
          &copy; {{ currentYear }} VYBE House. All rights reserved.
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
