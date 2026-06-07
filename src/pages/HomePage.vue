<script setup lang="ts">
import { ArrowRight, Sparkles, Hexagon, Layers } from "lucide-vue-next"
import { ROUTES, getCategoryRoute } from "../router/routes"
</script>

<template>
  <section class="vybe-page space-y-8 sm:space-y-12 md:space-y-16">
    
    <div class="vybe-reveal relative flex min-h-[min(75vh,28rem)] w-full flex-col items-center justify-center overflow-hidden rounded-[1.75rem] sm:min-h-[min(75vh,32rem)] sm:rounded-[2.5rem] md:min-h-[35rem]" style="--delay: 100ms;">
      
      <video 
        autoplay 
        loop 
        muted 
        playsinline 
        preload="auto"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-[20s] hover:scale-105"
        poster="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80"
      >
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>

      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>

      <div class="relative z-10 flex flex-col items-center px-6 text-center">
        <p class="vybe-kicker mb-4 text-[10px] text-white/80 sm:mb-6 sm:text-[12px]">
          Welcome to the House
        </p>
        <h1 class="vybe-display max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] text-white">
          Objects with presence.<br>
          <span class="text-white/70">Lives with purpose.</span>
        </h1>
        
        <p class="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:mt-8 sm:text-base">
          A curated storefront for those who demand more from their essentials. 
          Discover apparel, tech, and lifestyle pieces designed to command attention.
        </p>

        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <RouterLink :to="ROUTES.products" class="inline-flex h-12 md:h-14 items-center justify-center rounded-full bg-white px-8 text-xs font-semibold uppercase tracking-[0.24em] !text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-100 sm:text-sm">
            Enter The Catalog
          </RouterLink>
          <RouterLink :to="getCategoryRoute('lifestyle')" class="inline-flex h-12 md:h-14 items-center justify-center rounded-full border border-white/30 bg-black/20 px-8 text-xs font-semibold uppercase tracking-[0.24em] !text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm">
            Discover Lifestyle
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="space-y-6 sm:space-y-8">
      <div class="flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between sm:px-2">
        <h2 class="vybe-display text-2xl sm:text-4xl md:text-5xl">Explore by Discipline.</h2>
        <RouterLink :to="ROUTES.products" class="vybe-outline-link text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] hover:text-[color:var(--text)] sm:shrink-0">
          View All &rarr;
        </RouterLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 md:gap-6">
        
        <RouterLink :to="getCategoryRoute('men')" class="group relative h-[18rem] w-full overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] sm:h-[22rem] sm:rounded-[2rem] md:h-[26rem]">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" alt="Apparel" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
          <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p class="vybe-kicker text-[10px] text-white/70">Wardrobe</p>
            <p class="vybe-display mt-2 text-3xl text-white">Apparel</p>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-white/80">Menswear & Womenswear</p>
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-2">
                <ArrowRight class="h-4 w-4" />
              </span>
            </div>
          </div>
        </RouterLink>

        <RouterLink :to="getCategoryRoute('tech')" class="group relative h-[18rem] w-full overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] sm:h-[22rem] sm:rounded-[2rem] md:h-[26rem]">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" alt="Tech" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
          <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p class="vybe-kicker text-[10px] text-white/70">Innovation</p>
            <p class="vybe-display mt-2 text-3xl text-white">Elevated Tech</p>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-white/80">Sleek accessories for digital life</p>
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-2">
                <ArrowRight class="h-4 w-4" />
              </span>
            </div>
          </div>
        </RouterLink>

        <RouterLink :to="getCategoryRoute('lifestyle')" class="group relative h-[18rem] w-full overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] sm:col-span-2 sm:h-[22rem] sm:rounded-[2rem] md:h-[26rem] lg:col-span-1">
          <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80" alt="Lifestyle" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
          <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p class="vybe-kicker text-[10px] text-white/70">Environment</p>
            <p class="vybe-display mt-2 text-3xl text-white">Home & Object</p>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-white/80">Curate your physical space</p>
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-2">
                <ArrowRight class="h-4 w-4" />
              </span>
            </div>
          </div>
        </RouterLink>

      </div>
    </div>

    <div class="rounded-[2.5rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_60%,transparent)] p-6 sm:p-10 md:p-12 lg:p-16 backdrop-blur-xl">
      <div class="text-center">
        <p class="vybe-kicker text-[10px] sm:text-[11px]">The Standard</p>
        <h2 class="vybe-display mt-4 text-3xl sm:text-4xl md:text-5xl">Why source from us?</h2>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-3 sm:mt-12 lg:gap-10">
        <div class="group flex flex-col items-center text-center">
          <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow)]">
            <Sparkles class="h-6 w-6 text-[color:var(--text)]" />
          </div>
          <h3 class="vybe-display text-xl sm:text-2xl">Bespoke Curation</h3>
          <p class="mt-3 text-xs leading-6 text-[color:var(--muted)] sm:text-sm">
            We review thousands of products, keeping only those that pass our rigorous aesthetic and structural tests.
          </p>
        </div>

        <div class="group flex flex-col items-center text-center">
          <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow)]">
            <Layers class="h-6 w-6 text-[color:var(--text)]" />
          </div>
          <h3 class="vybe-display text-xl sm:text-2xl">Tactile Quality</h3>
          <p class="mt-3 text-xs leading-6 text-[color:var(--muted)] sm:text-sm">
            From heavy-weight cotton to precision-machined aluminum, the physical feel of our products is never compromised.
          </p>
        </div>

        <div class="group flex flex-col items-center text-center">
          <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--bg)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow)]">
            <Hexagon class="h-6 w-6 text-[color:var(--text)]" />
          </div>
          <h3 class="vybe-display text-xl sm:text-2xl">Gallery Atmosphere</h3>
          <p class="mt-3 text-xs leading-6 text-[color:var(--muted)] sm:text-sm">
            No endless scrolling or aggressive popups. We treat our storefront like a physical gallery—clean, calm, and deliberate.
          </p>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Optional: ensures video doesn't break overflow if you have extreme border radius */
video {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
}
</style>
