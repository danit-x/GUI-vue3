import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const HomePage = () => import("../pages/HomePage.vue")
const ProductsPage = () => import("../pages/ProductsPage.vue")
const LoginPage = () => import("../pages/LoginPage.vue")
const CartPage = () => import("../pages/CartPage.vue")
const SignupPage = () => import("../pages/SignupPage.vue")
const ProductDetailPage = () => import("../pages/ProductDetailPage.vue")
const WishlistPage = () => import("../pages/WishlistPage.vue")

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomePage },
  { path: "/products", name: "products", component: ProductsPage },
  { path: "/category/:slug", name: "category", component: ProductsPage },
  { path: "/product/:id", component: ProductDetailPage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/cart", component: CartPage },
  { path: "/wishlist", component: WishlistPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
