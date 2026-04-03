export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error("API request failed")
  }

  return response.json()
}
