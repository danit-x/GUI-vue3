import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { ROUTES } from "./routes"

const HomePage = () => import("../pages/HomePage.vue")
const ProductsPage = () => import("../pages/ProductsPage.vue")
const LoginPage = () => import("../pages/LoginPage.vue")
const CartPage = () => import("../pages/CartPage.vue")
const CheckoutPage = () => import("../pages/CheckoutPage.vue")
const OrderSuccessPage = () => import("../pages/OrderSuccessPage.vue")
const SignupPage = () => import("../pages/SignupPage.vue")
const ProductDetailPage = () => import("../pages/ProductDetailPage.vue")
const WishlistPage = () => import("../pages/WishlistPage.vue")
const ProfilePage = () => import("../pages/ProfilePage.vue")
const NotFoundPage = () => import("../pages/NotFoundPage.vue")

const routes: RouteRecordRaw[] = [
  { path: ROUTES.home, name: "home", component: HomePage },
  { path: ROUTES.products, name: "products", component: ProductsPage },
  { path: ROUTES.category, name: "category", component: ProductsPage },
  { path: ROUTES.productDetail, name: "product-detail", component: ProductDetailPage },
  { path: ROUTES.login, name: "login", component: LoginPage },
  { path: ROUTES.signup, name: "signup", component: SignupPage },
  { path: ROUTES.cart, name: "cart", component: CartPage },
  { path: ROUTES.checkout, name: "checkout", component: CheckoutPage, meta: { requiresAuth: true } },
  { path: ROUTES.orderSuccess, name: "order-success", component: OrderSuccessPage, meta: { requiresAuth: true } },
  { path: ROUTES.wishlist, name: "wishlist", component: WishlistPage },
  { path: ROUTES.profile, name: "profile", component: ProfilePage, meta: { requiresAuth: true } },
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
    path: ROUTES.login,
    query: {
      redirect: to.fullPath
    }
  }
})

export default router
