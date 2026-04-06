export const ORDER_SUMMARY_KEY = "latest_order_summary"
export const ORDER_HISTORY_KEY = "order_history"

export interface OrderProgressStep {
  label: string
  detail: string
  state: "complete" | "current" | "upcoming"
}

export interface OrderSummaryItem {
  id: number
  title: string
  quantity: number
  price: number
}

export interface OrderPaymentMethod {
  id: string
  label: string
  detail: string
}

export interface OrderSummary {
  id: string
  userId: number | null
  items: OrderSummaryItem[]
  itemCount: number
  totalPrice: number
  placedAt: string
  status: string
  paymentMethod: OrderPaymentMethod
  progressSteps: OrderProgressStep[]
}

export function getStoredOrderHistory() {
  const raw = localStorage.getItem(ORDER_HISTORY_KEY)
  return raw ? JSON.parse(raw) as OrderSummary[] : []
}

export function saveOrderToHistory(orderSummary: OrderSummary) {
  const currentOrders = getStoredOrderHistory()
  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify([orderSummary, ...currentOrders]))
}

export function getOrdersForUser(userId: number | null | undefined) {
  if (userId == null) {
    return []
  }

  return getStoredOrderHistory().filter((order) => order.userId === userId)
}
