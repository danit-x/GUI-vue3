export const BASE_URL = "https://dummyjson.com"

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error("API request failed")
  }

  return response.json()
}
