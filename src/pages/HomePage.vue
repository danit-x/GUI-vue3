<template>
  <section class="vybe-page space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
    <div class="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(18rem,0.96fr)] lg:items-start lg:gap-8 md:gap-7">
      <div class="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-10">
        <div class="vybe-reveal space-y-4 sm:space-y-5" style="--delay: 80ms;">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">
            House of elevated objects
          </p>

          <h1 class="vybe-display max-w-5xl text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.9]">
            Dress your space with pieces that hold their own.
          </h1>
        </div>

        <div class="vybe-reveal grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(11rem,13rem)]" style="--delay: 180ms;">
          <p class="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base md:text-lg md:leading-8">
            VYBE curates modern tech, sculptural accessories, and quiet essentials with the discipline of a fashion house. The atmosphere is cinematic in the dark and editorial in the light.
          </p>

          <div class="border-t border-[color:var(--line)] pt-4 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)] sm:text-sm lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <p>Edition 04</p>
            <p class="mt-2 sm:mt-3">Crafted for daily rituals</p>
          </div>
        </div>

        <div class="vybe-reveal flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4" style="--delay: 280ms;">
          <RouterLink to="/products" class="vybe-button rounded-full px-6 py-3 text-center text-xs uppercase tracking-[0.28em] sm:px-8 sm:py-4 sm:text-sm md:px-10 md:py-4">
            Enter The Collection
          </RouterLink>
          <RouterLink to="/wishlist" class="vybe-outline-link vybe-pill rounded-full px-6 py-3 text-center text-xs uppercase tracking-[0.28em] sm:px-8 sm:py-4 sm:text-sm md:px-10 md:py-4">
            View Private Selection
          </RouterLink>
        </div>
      </div>

      <div class="vybe-reveal lg:pt-10" style="--delay: 220ms;">
        <div class="vybe-hero relative overflow-hidden rounded-[2.5rem] p-3 sm:p-4 md:p-5">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_32%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.04)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(216,190,146,0.12),transparent_32%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.22)_100%)]" />

          <div class="relative grid gap-3 sm:gap-4 md:gap-5">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury fashion editorial mood"
            class="h-[clamp(18rem,58vw,32rem)] w-full rounded-[2rem] object-cover"
          />

            <div class="grid gap-3 sm:gap-4 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-5">
              <div class="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_88%,transparent)] p-4 sm:p-5 md:p-6">
                <p class="vybe-kicker text-[10px] sm:text-[11px]">
                  Signature note
                </p>
                <p class="vybe-display mt-2 sm:mt-3 text-2xl leading-tight sm:text-3xl md:text-4xl md:leading-[0.96]">
                  Precision, tactility, and a little after-hours drama.
                </p>
              </div>

              <div class="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_86%,transparent)] p-4 sm:p-5 md:p-6">
                <p class="vybe-kicker text-[10px] sm:text-[11px]">Mood</p>
                <p class="mt-2.5 sm:mt-4 text-xl sm:text-2xl text-[color:var(--text)]">Nocturne</p>
                <p class="mt-4 sm:mt-6 text-[9px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:text-xs">Light shifts to ivory editorial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-5 sm:gap-6 md:gap-6 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,1fr)]">
      <div class="vybe-reveal flex items-end" style="--delay: 340ms;">
        <div class="w-full rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_78%,transparent)] p-5 sm:p-6 lg:py-6">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">House values</p>
          <p class="vybe-display mt-3 sm:mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl lg:leading-none">Curate less.</p>
          <p class="mt-3 sm:mt-4 text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7">
            Every touchpoint should feel chosen, not filled.
          </p>
        </div>
      </div>

      <div class="vybe-reveal grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6" style="--delay: 420ms;">
        <article class="vybe-stat rounded-[2rem] p-5 sm:p-6 md:p-7 min-h-[13rem]">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Atmosphere</p>
          <p class="vybe-display mt-4 sm:mt-6 text-3xl leading-tight sm:text-4xl lg:text-4xl lg:leading-none">Gallery calm</p>
          <p class="mt-3 sm:mt-5 max-w-xs text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7">
            Space, shadow, and restraint replace the noise of a typical storefront.
          </p>
        </article>

        <article class="vybe-stat rounded-[2rem] p-5 sm:p-6 md:p-7 min-h-[13rem] md:-translate-y-6">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Materials</p>
          <p class="vybe-display mt-4 sm:mt-6 text-3xl leading-tight sm:text-4xl lg:text-4xl lg:leading-none">Ivory. Onyx. Gold.</p>
          <p class="mt-3 sm:mt-5 max-w-xs text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7">
            A warm palette with metallic nuance keeps both themes expensive and connected.
          </p>
        </article>

        <article class="vybe-stat rounded-[2rem] p-5 sm:p-6 md:p-7 min-h-[13rem]">
          <p class="vybe-kicker text-[10px] sm:text-[11px]">Pacing</p>
          <p class="vybe-display mt-4 sm:mt-6 text-3xl leading-tight sm:text-4xl lg:text-4xl lg:leading-none">Slow reveal</p>
          <p class="mt-3 sm:mt-5 max-w-xs text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7">
            Motion stays soft and deliberate so the experience feels composed from first load onward.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
