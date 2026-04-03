export const ROUTES = {
  home: "/",
  products: "/products",
  category: "/category/:slug",
  productDetail: "/product/:id",
  login: "/login",
  signup: "/signup",
  cart: "/cart",
  checkout: "/checkout",
  orderSuccess: "/order-success",
  wishlist: "/wishlist",
  profile: "/profile"
} as const

export function getCategoryRoute(slug: string) {
  return `/category/${slug}`
}

export function getProductDetailRoute(id: number | string) {
  return `/product/${id}`
}
