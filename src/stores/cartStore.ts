import { defineStore } from "pinia"
import type { Product } from "../types/product"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart") || "[]") as Product[]
  }),

  getters: {
    itemCount: (state) => state.items.length
  },

  actions: {
    addToCart(product: Product) {
      this.items.push(product)
      localStorage.setItem("cart", JSON.stringify(this.items))
    },

    removeFromCart(id: number) {
      this.items = this.items.filter(p => p.id !== id)
      localStorage.setItem("cart", JSON.stringify(this.items))
    },

    clearCart() {
      this.items = []
      localStorage.removeItem("cart")
    }
  }
})