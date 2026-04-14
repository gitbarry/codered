<template>
  <div
    class="flex min-h-dvh flex-col bg-gradient-to-b from-teal-950 via-emerald-950 to-teal-950 text-teal-50 antialiased"
  >
    <header class="border-b border-teal-800/60 bg-teal-950/85 backdrop-blur-md">
      <div
        class="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
          <span class="text-xl font-semibold tracking-tight text-amber-100">Foreverdays</span>
          <span class="text-xs font-medium uppercase tracking-widest text-teal-300/90">
            Charity initiative
          </span>
        </div>
        <NuxtLink
          to="/"
          class="text-sm font-medium text-teal-200/90 underline decoration-teal-600 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-400/80"
        >
          ← Back to main site
        </NuxtLink>
      </div>
    </header>
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <slot />
    </main>
    <footer class="border-t border-teal-800/50 py-8 text-center text-sm text-teal-300/80">
      <p>Foreverdays is a separately branded charity space. Donations are processed by JustGiving.</p>
    </footer>
  </div>
</template>
