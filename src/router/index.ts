import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { useAuthStore } from "../stores/authStore"

const HomePage = () => import("../pages/HomePage.vue")
const ProductsPage = () => import("../pages/ProductsPage.vue")
const LoginPage = () => import("../pages/LoginPage.vue")
const CartPage = () => import("../pages/CartPage.vue")
const CheckoutPage = () => import("../pages/CheckoutPage.vue")
const SignupPage = () => import("../pages/SignupPage.vue")
const ProductDetailPage = () => import("../pages/ProductDetailPage.vue")
const WishlistPage = () => import("../pages/WishlistPage.vue")
const ProfilePage = () => import("../pages/ProfilePage.vue")

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomePage },
  { path: "/products", name: "products", component: ProductsPage },
  { path: "/category/:slug", name: "category", component: ProductsPage },
  { path: "/product/:id", component: ProductDetailPage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/cart", component: CartPage },
  { path: "/checkout", component: CheckoutPage, meta: { requiresAuth: true } },
  { path: "/wishlist", component: WishlistPage },
  { path: "/profile", component: ProfilePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) {
    return true
  }

  const authStore = useAuthStore()

  if (authStore.isLoggedIn) {
    return true
  }

  return {
    path: "/login",
    query: {
      redirect: to.fullPath
    }
  }
})

export default router
