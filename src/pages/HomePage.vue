<template>
  <section class="vybe-page space-y-8 lg:space-y-12">
    <div class="grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(20rem,0.96fr)] lg:items-start">
      <div class="space-y-8 lg:space-y-10">
        <div class="vybe-reveal space-y-5" style="--delay: 80ms;">
          <p class="vybe-kicker">
            House of elevated objects
          </p>

          <h1 class="vybe-display max-w-5xl text-6xl leading-[0.86] sm:text-7xl lg:text-[7.5rem]">
            Dress your space with pieces that hold their own.
          </h1>
        </div>

        <div class="vybe-reveal grid gap-6 lg:grid-cols-[minmax(0,1fr)_13rem]" style="--delay: 180ms;">
          <p class="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            VYBE curates modern tech, sculptural accessories, and quiet essentials with the discipline of a fashion house. The atmosphere is cinematic in the dark and editorial in the light.
          </p>

          <div class="border-l border-[color:var(--line)] pl-5 text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
            <p>Edition 04</p>
            <p class="mt-3">Crafted for daily rituals</p>
          </div>
        </div>

        <div class="vybe-reveal flex flex-col gap-4 sm:flex-row sm:flex-wrap" style="--delay: 280ms;">
          <RouterLink to="/products" class="vybe-button rounded-full px-8 py-4 text-center text-sm uppercase tracking-[0.28em]">
            Enter The Collection
          </RouterLink>
          <RouterLink to="/wishlist" class="vybe-outline-link vybe-pill rounded-full px-8 py-4 text-center text-sm uppercase tracking-[0.28em]">
            View Private Selection
          </RouterLink>
        </div>
      </div>

      <div class="vybe-reveal lg:pt-10" style="--delay: 220ms;">
        <div class="vybe-hero relative overflow-hidden rounded-[2.5rem] p-4 sm:p-5">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_32%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.04)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(216,190,146,0.12),transparent_32%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.22)_100%)]" />

          <div class="relative grid gap-4">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury fashion editorial mood"
              class="h-[26rem] w-full rounded-[2rem] object-cover sm:h-[32rem]"
            />

            <div class="grid gap-4 sm:grid-cols-[minmax(0,1fr)_11rem]">
              <div class="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_88%,transparent)] p-5 backdrop-blur-xl">
                <p class="vybe-kicker">
                  Signature note
                </p>
                <p class="vybe-display mt-3 text-3xl leading-[0.96] sm:text-4xl">
                  Precision, tactility, and a little after-hours drama.
                </p>
              </div>

              <div class="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-strong)_86%,transparent)] p-5">
                <p class="vybe-kicker">Mood</p>
                <p class="mt-4 text-2xl text-[color:var(--text)]">Nocturne</p>
                <p class="mt-6 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">Light shifts to ivory editorial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,1fr)]">
      <div class="vybe-reveal flex items-end" style="--delay: 340ms;">
        <div class="rounded-[2rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_78%,transparent)] p-6">
          <p class="vybe-kicker">House values</p>
          <p class="vybe-display mt-4 text-4xl leading-none sm:text-5xl">Curate less.</p>
          <p class="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Every touchpoint should feel chosen, not filled.
          </p>
        </div>
      </div>

      <div class="vybe-reveal grid gap-4 md:grid-cols-3" style="--delay: 420ms;">
        <article class="vybe-stat min-h-52 rounded-[2rem] p-6">
          <p class="vybe-kicker">Atmosphere</p>
          <p class="vybe-display mt-6 text-4xl leading-none">Gallery calm</p>
          <p class="mt-5 max-w-xs text-sm leading-7 text-[color:var(--muted)]">
            Space, shadow, and restraint replace the noise of a typical storefront.
          </p>
        </article>

        <article class="vybe-stat md:-translate-y-6 min-h-52 rounded-[2rem] p-6">
          <p class="vybe-kicker">Materials</p>
          <p class="vybe-display mt-6 text-4xl leading-none">Ivory. Onyx. Gold.</p>
          <p class="mt-5 max-w-xs text-sm leading-7 text-[color:var(--muted)]">
            A warm palette with metallic nuance keeps both themes expensive and connected.
          </p>
        </article>

        <article class="vybe-stat min-h-52 rounded-[2rem] p-6">
          <p class="vybe-kicker">Pacing</p>
          <p class="vybe-display mt-6 text-4xl leading-none">Slow reveal</p>
          <p class="mt-5 max-w-xs text-sm leading-7 text-[color:var(--muted)]">
            Motion stays soft and deliberate so the experience feels composed from first load onward.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
