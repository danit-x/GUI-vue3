<template>
  <section class="vybe-page grid items-center gap-8 lg:min-h-[calc(100vh-10rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
    <div class="space-y-8">
      <div class="vybe-reveal space-y-5" style="--delay: 80ms;">
        <p class="vybe-kicker">
          Curated lifestyle and tech objects
        </p>

        <h1 class="vybe-display max-w-4xl text-5xl leading-[0.94] sm:text-6xl lg:text-8xl">
          Design your daily ritual, not just your cart.
        </h1>
      </div>

      <p class="vybe-reveal max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg" style="--delay: 180ms;">
        VYBE treats gadgets, desk pieces, and modern essentials like collectible editions. The mood is tactile, editorial, and a little nocturnal.
      </p>

      <div class="vybe-reveal flex flex-col gap-3 sm:flex-row sm:flex-wrap" style="--delay: 280ms;">
        <RouterLink to="/products" class="vybe-button rounded-full px-6 py-3 text-center text-sm uppercase tracking-[0.22em]">
          Enter The Collection
        </RouterLink>
        <RouterLink to="/wishlist" class="vybe-pill rounded-full px-6 py-3 text-center text-sm uppercase tracking-[0.22em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]">
          View Saved Pieces
        </RouterLink>
      </div>

      <div class="vybe-reveal grid gap-4 sm:grid-cols-3" style="--delay: 360ms;">
        <div class="vybe-stat">
          <p class="vybe-kicker">Curated feel</p>
          <p class="mt-3 text-2xl text-[color:var(--text)]">Editorial</p>
        </div>
        <div class="vybe-stat">
          <p class="vybe-kicker">Browsing style</p>
          <p class="mt-3 text-2xl text-[color:var(--text)]">Responsive</p>
        </div>
        <div class="vybe-stat">
          <p class="vybe-kicker">Experience</p>
          <p class="mt-3 text-2xl text-[color:var(--text)]">Collected</p>
        </div>
      </div>
    </div>

    <div class="vybe-reveal" style="--delay: 220ms;">
      <div class="vybe-hero relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8 lg:p-9">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),linear-gradient(160deg,transparent_0%,rgba(175,77,46,0.08)_100%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,208,141,0.12),transparent_28%),linear-gradient(160deg,transparent_0%,rgba(240,138,75,0.12)_100%)]" />

        <div class="relative space-y-6">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="vybe-kicker">
                This season
              </p>
              <p class="vybe-display mt-3 text-4xl leading-none sm:text-5xl">
                Soft copper.
              </p>
            </div>

            <div class="self-start rounded-full border border-[color:var(--line)] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
              Edition 03
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="vybe-card rounded-[1.75rem] p-5">
              <p class="vybe-kicker">
                Atmosphere
              </p>
              <p class="mt-3 text-sm leading-7 text-[color:var(--text)]">
                Warm paper, lacquer black, brushed copper, and a gallery-like layout that favors presence over noise.
              </p>
            </div>

            <div class="vybe-card rounded-[1.75rem] p-5">
              <p class="vybe-kicker">
                Experience
              </p>
              <p class="mt-3 text-sm leading-7 text-[color:var(--text)]">
                Browse, save, and collect with a storefront that feels more like a journal spread than a starter app.
              </p>
            </div>
          </div>

          <div class="rounded-[1.9rem] border border-dashed border-[color:var(--line)] p-5 sm:p-6">
            <p class="vybe-kicker">
              Signature note
            </p>
            <p class="mt-3 vybe-display text-2xl leading-tight sm:text-3xl">
              "A store should set a mood before it sells a product."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
