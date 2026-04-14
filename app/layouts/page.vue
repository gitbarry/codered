<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main>
      <div class="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
