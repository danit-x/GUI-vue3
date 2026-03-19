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

export function getCategories() {
  return apiFetch<string[]>("/products/categories")
}
