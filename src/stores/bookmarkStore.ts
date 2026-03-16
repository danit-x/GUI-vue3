import { defineStore } from "pinia"
import type { Product } from "../types/product"

export const useBookmarkStore = defineStore("bookmark", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("bookmarks") || "[]") as Product[]
  }),

  getters: {
    count: (state) => state.items.length
  },

  actions: {
    toggleBookmark(product: Product) {

      const exists = this.items.find(p => p.id === product.id)

      if (exists) {
        this.items = this.items.filter(p => p.id !== product.id)
      } else {
        this.items.push(product)
      }

      localStorage.setItem("bookmarks", JSON.stringify(this.items))
    }
  }
})