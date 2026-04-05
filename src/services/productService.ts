import { apiFetch } from "./api"
import type { Product } from "../types/product"

interface ProductsResponse {
  products: Product[]
}

export function getProducts() {
  return apiFetch<ProductsResponse>("/products?limit=0")
}

export function getProductById(id: number) {
  return apiFetch<Product>(`/products/${id}`)
}

interface CategoryEntry {
  slug: string
  name: string
  url: string
}

export async function getCategories(): Promise<string[]> {
  const data = await apiFetch<CategoryEntry[] | string[]>("/products/categories")

  // Handle both old format (string[]) and new format ({ slug, name, url }[])
  return data.map((entry) =>
    typeof entry === "string" ? entry : entry.slug
  )
}