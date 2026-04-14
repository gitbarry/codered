<template>
  <div class="page-wrapper">
    <AppHeader />
    <main class="site-main">
      <div class="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
<style scoped lang="postcss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.site-header {
  flex: 0 0 auto;
}
.site-main {
  flex: 1;
}
.site-footer {
  flex: 0 0 auto;
}
</style>