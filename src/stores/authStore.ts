import { defineStore } from "pinia"

const TOKEN_KEY = "auth_token"
const USER_KEY = "auth_user"

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image?: string
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
    setAuth(payload: { token: string; user: AuthUser }) {
      this.token = payload.token
      this.user = payload.user
      localStorage.setItem(TOKEN_KEY, payload.token)
      localStorage.setItem(USER_KEY, JSON.stringify(payload.user))
    },

    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }
})
