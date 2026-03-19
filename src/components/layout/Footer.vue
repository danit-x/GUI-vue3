<template>
  <footer class="px-4 pb-6 pt-2 sm:px-6 lg:px-8">
    <div class="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--bg-elevated)] px-5 py-6 text-sm text-[color:var(--muted)] shadow-[0_24px_70px_rgba(26,17,12,0.08)] backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="max-w-xl">
        <p class="vybe-display text-lg text-[color:var(--text)]">VYBE Store</p>
        <p class="mt-2 leading-7">Curated products, responsive browsing, and a storefront system polished to feel presentation-ready.</p>
      </div>

      <div class="flex flex-wrap gap-x-5 gap-y-3 text-xs uppercase tracking-[0.22em]">
        <RouterLink to="/" class="transition hover:text-[color:var(--text)]">Home</RouterLink>
        <RouterLink to="/products" class="transition hover:text-[color:var(--text)]">Products</RouterLink>
        <RouterLink to="/wishlist" class="transition hover:text-[color:var(--text)]">Wishlist</RouterLink>
        <RouterLink to="/cart" class="transition hover:text-[color:var(--text)]">Cart</RouterLink>
      </div>
    </div>
  </footer>
</template>
