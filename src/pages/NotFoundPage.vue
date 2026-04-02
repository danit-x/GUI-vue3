<template>
  <section class="vybe-page">
    <div class="vybe-empty px-4 py-12 text-center sm:px-6 sm:py-16 md:px-8">
      <p class="vybe-kicker text-[10px] sm:text-[11px]">404</p>
      <h1 class="vybe-display mt-3 text-3xl text-[color:var(--text)] sm:text-4xl md:text-5xl">
        Page not found
      </h1>
      <p class="mx-auto mt-3 max-w-xl text-xs leading-6 text-[color:var(--muted)] sm:text-sm sm:leading-7 md:text-base md:leading-8">
        The page you are looking for does not exist or may have moved.
      </p>
      <RouterLink
        to="/"
        class="vybe-button vybe-touch-target mt-5 inline-flex rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
      >
        Back Home
      </RouterLink>
    </div>
  </section>
</template>
