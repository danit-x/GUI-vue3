import { defineStore } from "pinia"
import { useBookmarkStore } from "./bookmarkStore"
import { useCartStore } from "./cartStore"

const TOKEN_KEY = "auth_token"
const USER_KEY = "auth_user"
const TOKEN_EXPIRY_KEY = "auth_token_expiry"
const DEFAULT_TOKEN_LIFETIME_MS = 30 * 60 * 1000

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image?: string
}

export function getStoredTokenExpiry() {
  const rawValue = localStorage.getItem(TOKEN_EXPIRY_KEY)
  const expiry = rawValue ? Number(rawValue) : NaN

  return Number.isFinite(expiry) ? expiry : null
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: JSON.parse(localStorage.getItem(USER_KEY) || "null") as AuthUser | null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    setAuth(payload: { token: string; user: AuthUser; expiresAt?: number }) {
      const expiresAt = payload.expiresAt ?? Date.now() + DEFAULT_TOKEN_LIFETIME_MS

      this.token = payload.token
      this.user = payload.user
      localStorage.setItem(TOKEN_KEY, payload.token)
      localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
      localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiresAt))
    },

    setToken(token: string, expiresAt = Date.now() + DEFAULT_TOKEN_LIFETIME_MS) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiresAt))
    },

    logout() {
      const cartStore = useCartStore()
      const bookmarkStore = useBookmarkStore()

      cartStore.clearCart()
      bookmarkStore.clearBookmarks()
      this.token = null
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
    }
  }
})
