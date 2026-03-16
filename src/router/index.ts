import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import ProductsPage from '../pages/ProductsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import CartPage from '../pages/CartPage.vue'

import ProductDetailPage from "../pages/ProductDetailPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/products", component: ProductsPage },
    { path: "/product/:id", component: ProductDetailPage },
    { path: "/login", component: LoginPage },
    { path: "/cart", component: CartPage }
  ]
})

export default router