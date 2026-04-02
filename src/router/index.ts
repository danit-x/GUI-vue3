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
const NotFoundPage = () => import("../pages/NotFoundPage.vue")

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomePage },
  { path: "/products", name: "products", component: ProductsPage },
  { path: "/category/:slug", name: "category", component: ProductsPage },
  { path: "/product/:id", name: "product-detail", component: ProductDetailPage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/signup", name: "signup", component: SignupPage },
  { path: "/cart", name: "cart", component: CartPage },
  { path: "/checkout", name: "checkout", component: CheckoutPage, meta: { requiresAuth: true } },
  { path: "/wishlist", name: "wishlist", component: WishlistPage },
  { path: "/profile", name: "profile", component: ProfilePage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage }
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
