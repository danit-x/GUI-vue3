import { ref } from "vue"

const COUNTRY_KEY = "vybe_country"

export const countryOptions = [
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Sri Lanka", flag: "🇱🇰" }
] as const

const defaultCountry = countryOptions[0].name
const selectedCountry = ref(localStorage.getItem(COUNTRY_KEY) || defaultCountry)

export function useCountryPreference() {
  function setCountry(country: string) {
    selectedCountry.value = country
    localStorage.setItem(COUNTRY_KEY, country)
  }

  return {
    countryOptions,
    selectedCountry,
    setCountry
  }
}
