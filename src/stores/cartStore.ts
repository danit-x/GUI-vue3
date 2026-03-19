import { defineStore } from "pinia"
import type { Product } from "../types/product"

const CART_STORAGE_KEY = "cart"

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]") as CartItem[]
  }),

  getters: {
    itemCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  actions: {
    persistCart() {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items))
    },

    addToCart(product: Product) {
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }

      this.persistCart()
    },

    removeFromCart(id: number) {
      this.items = this.items.filter((product) => product.id !== id)
      this.persistCart()
    },

    updateQuantity(id: number, quantity: number) {
      if (quantity <= 0) {
        this.removeFromCart(id)
        return
      }

      const item = this.items.find((product) => product.id === id)

      if (!item) {
        return
      }

      item.quantity = quantity
      this.persistCart()
    },

    clearCart() {
      this.items = []
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }
})
