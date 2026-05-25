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
  <footer class="w-full border-t border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_86%,transparent)] backdrop-blur-xl">
    <div class="mx-auto w-full px-4 py-10 sm:px-6 md:px-8 md:py-12 lg:px-10 xl:px-14">
      
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        
        <div class="flex flex-col items-start justify-start">
          <RouterLink
            :to="ROUTES.home"
            class="group inline-flex items-center transition-transform duration-300 hover:scale-105"
            aria-label="VYBE Home"
          >
            <span class="vybe-display text-[2.5rem] tracking-[0.14em] text-[color:var(--text)] transition-colors duration-200 group-hover:opacity-70 sm:text-[3rem]">
              VYBE
            </span>
          </RouterLink>
        </div>

        <div>
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Shop</p>
          <ul class="mt-4 space-y-3 sm:mt-5">
            <li><RouterLink :to="ROUTES.products" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">All Products</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('men')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Men</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('women')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Women</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('tech')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Tech</RouterLink></li>
            <li><RouterLink :to="getCategoryRoute('lifestyle')" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Lifestyle</RouterLink></li>
          </ul>
        </div>

        <div>
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Account</p>
          <ul class="mt-4 space-y-3 sm:mt-5">
            <li><RouterLink :to="ROUTES.profile" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Profile</RouterLink></li>
            <li><RouterLink :to="ROUTES.wishlist" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Wishlist</RouterLink></li>
            <li><RouterLink :to="ROUTES.cart" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Cart</RouterLink></li>
            <li><RouterLink :to="loginLocation" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:text-sm">Sign In</RouterLink></li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Region</p>

          <div ref="dropdownRef" class="relative max-w-[16rem]">
            <button
              type="button"
              class="vybe-surface-link flex w-full min-w-0 items-center gap-2 rounded-[1.5rem] px-4 py-3 text-left transition-colors duration-200 hover:bg-[color:var(--line)]"
              :aria-expanded="isOpen"
              aria-haspopup="listbox"
              @click="toggleDropdown"
            >
              <span class="text-base text-[color:var(--text)]">{{ selectedCountryOption.flag }}</span>
              <span class="min-w-0 flex-1 truncate text-xs uppercase tracking-[0.16em] text-[color:var(--text)] sm:text-sm">
                {{ selectedCountryOption.name }}
              </span>
              <ChevronDown
                class="h-4 w-4 shrink-0 text-[color:var(--muted)] transition-transform duration-200"
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
                  class="vybe-outline-link flex w-full items-center gap-3 rounded-[1rem] px-3 py-2.5 text-left text-xs transition-colors duration-200 sm:text-sm hover:bg-[color:color-mix(in_srgb,var(--bg-strong)_80%,transparent)]"
                  :class="country.name === selectedCountry ? 'text-[color:var(--accent)]' : 'text-[color:var(--text)]'"
                  @click="selectCountry(country.name)"
                >
                  <span class="text-base">{{ country.flag }}</span>
                  <span class="truncate">{{ country.name }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vybe-divider mt-10 sm:mt-12" />

      <div class="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs">
          &copy; {{ currentYear }} VYBE House. All rights reserved.
        </p>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <RouterLink to="#" class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)] sm:text-xs">Privacy Policy</RouterLink>
          <RouterLink to="#" class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)] sm:text-xs">Terms of Use</RouterLink>
          <RouterLink to="#" class="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)] sm:text-xs">Cookie Settings</RouterLink>
        </div>
      </div>
      
    </div>
  </footer>
</template>