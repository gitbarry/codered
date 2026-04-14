<template>
  <header class="site-header relative z-50 bg-zinc-950/90 backdrop-blur-md">
    <div
      class="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight text-white transition hover:text-red-400"
      >
        <img src="/images/code-red-logo.jpg" alt="Code Red" width="80" height="80" class="site-logo" />
      </NuxtLink>
      <AppNav />
    </div>
  </header>
</template>

<style scoped lang="postcss">
.site-header {
  border-bottom: 10px solid var(--color-brand);
  background-color: rgba(0, 0, 0, 1);
}
.site-logo {
  max-height: 100px;
}
</style>