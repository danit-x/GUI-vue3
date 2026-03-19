<template>
  <section class="grid min-h-[calc(100vh-9rem)] items-center gap-10 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
    <div class="space-y-8">
      <div class="vybe-reveal space-y-4" style="--delay: 80ms;">
        <p class="text-xs uppercase tracking-[0.45em] text-[color:var(--muted)]">
          Curated lifestyle and tech objects
        </p>

        <h1 class="vybe-display max-w-4xl text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
          Design your daily ritual, not just your cart.
        </h1>
      </div>

      <p class="vybe-reveal max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg" style="--delay: 180ms;">
        VYBE treats gadgets, desk pieces, and modern essentials like collectible editions. The mood is tactile, editorial, and a little nocturnal.
      </p>

      <div class="vybe-reveal flex flex-wrap gap-3" style="--delay: 280ms;">
        <RouterLink to="/products" class="vybe-button rounded-full px-6 py-3 text-sm uppercase tracking-[0.22em]">
          Enter The Collection
        </RouterLink>
        <RouterLink to="/wishlist" class="vybe-pill rounded-full px-6 py-3 text-sm uppercase tracking-[0.22em] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]">
          View Saved Pieces
        </RouterLink>
      </div>
    </div>

    <div class="vybe-reveal" style="--delay: 220ms;">
      <div class="vybe-panel relative overflow-hidden rounded-[2.25rem] p-6 sm:p-8">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),linear-gradient(160deg,transparent_0%,rgba(175,77,46,0.08)_100%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,208,141,0.12),transparent_28%),linear-gradient(160deg,transparent_0%,rgba(240,138,75,0.12)_100%)]" />

        <div class="relative space-y-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                This season
              </p>
              <p class="vybe-display mt-3 text-4xl leading-none">
                Soft copper.
              </p>
            </div>

            <div class="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
              Edition 03
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-5">
              <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Atmosphere
              </p>
              <p class="mt-3 text-sm leading-7 text-[color:var(--text)]">
                Warm paper, lacquer black, brushed copper, and a gallery-like layout that favors presence over noise.
              </p>
            </div>

            <div class="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--bg-strong)]/70 p-5">
              <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Experience
              </p>
              <p class="mt-3 text-sm leading-7 text-[color:var(--text)]">
                Browse, save, and collect with a storefront that feels more like a journal spread than a starter app.
              </p>
            </div>
          </div>

          <div class="rounded-[1.75rem] border border-dashed border-[color:var(--line)] p-5">
            <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Signature note
            </p>
            <p class="mt-3 vybe-display text-2xl leading-tight">
              “A store should set a mood before it sells a product.”
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
