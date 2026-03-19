import { createRouter, createWebHistory } from "vue-router"

import HomePage from "../pages/HomePage.vue"
import ProductsPage from "../pages/ProductsPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import CartPage from "../pages/CartPage.vue"
import SignupPage from "../pages/SignupPage.vue"
import ProductDetailPage from "../pages/ProductDetailPage.vue"
import WishlistPage from "../pages/WishlistPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/products", name: "products", component: ProductsPage },
    { path: "/category/:slug", name: "category", component: ProductsPage },
    { path: "/product/:id", component: ProductDetailPage },
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
    { path: "/cart", component: CartPage },
    { path: "/wishlist", component: WishlistPage }
  ]
})

export default router
