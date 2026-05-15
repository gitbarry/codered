<template>
  <header class="site-header">
    <div
      class="relative mx-auto flex max-w-6xl items-center lg:items-start justify-between gap-4 px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="text-lg font-semibold tracking-tight text-white transition hover:text-red-400"
      >
        <img src="/images/code-red-logo.jpg" alt="Code Red" width="80" height="80" class="site-logo" />
      </NuxtLink>
      <AppNav />
      <NuxtLink
        to="/"
        class="button foreverdays-button"
      >
        Forever Days
      </NuxtLink>

    </div>
  </header>
</template>

<style scoped lang="postcss">
.site-header {
  background-color: transparent;
  background-color: black;
  @media (min-width: 1024px) {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    border-top: 20px solid black;
  }
}
.site-logo {
  max-height: 100px;
}
.foreverdays-button {
  display: none;
  @media (min-width: 1024px) {
    display: block;
    background-color: var(--color-brand);
  color: white;
  padding: .5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  transition: all 0.3s ease;
  margin-top: .5rem;
  &:hover {
    background-color: var(--color-brand-muted);
  }
  }
}


</style>