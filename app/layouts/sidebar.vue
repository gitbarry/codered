<template>
  <div class="page-wrapper">
    <AppHeader />
    <main class="site-main">
        <div class="grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-start">
            <div class="min-w-0">
                <slot />
            </div>
        
        <div class="min-w-0">
            <slot name="sidebar" />
        </div>
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