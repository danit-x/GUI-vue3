import { defineStore } from "pinia"
import type { Product } from "../types/product"

const BOOKMARKS_STORAGE_KEY = "bookmarks"

export const useBookmarkStore = defineStore("bookmark", {
  state: () => ({
    items: JSON.parse(localStorage.getItem(BOOKMARKS_STORAGE_KEY) || "[]") as Product[]
  }),

  getters: {
    count: (state) => state.items.length,
    isBookmarked: (state) => (id: number) => state.items.some((product) => product.id === id)
  },

  actions: {
    persistBookmarks() {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(this.items))
    },

    toggleBookmark(product: Product) {
      const exists = this.items.find((p) => p.id === product.id)

      if (exists) {
        this.items = this.items.filter((p) => p.id !== product.id)
      } else {
        this.items.push(product)
      }

      this.persistBookmarks()
    },

    removeBookmark(id: number) {
      this.items = this.items.filter((product) => product.id !== id)
      this.persistBookmarks()
    }
  }
})
