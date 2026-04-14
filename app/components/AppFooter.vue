<template>
  <footer class="site-footer py-8 text-center text-sm">
    <nav class="footer-menu">
      <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      <NuxtLink to="/terms">Terms of Service</NuxtLink>
      <NuxtLink to="/contact">Contact</NuxtLink>
    </nav>
    <p>Code Read Drum and Bass &copy; {{ new Date().getFullYear() }}</p>
    <p>All rights reserved.</p>
    
  </footer>
</template>

<style scoped lang="postcss">
.site-footer {
  border-top: 10px solid var(--color-brand);
  background-color: rgba(0, 0, 0, 1);
  color: var(--color-text-footer);
  margin-top: 3rem;

  .footer-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: .5rem;
    margin-bottom: 2rem;
    @media (min-width: 768px) {
      flex-direction: row;
      gap: 2rem;
    }
    @media (min-width: 1024px) {
      a:hover {
        color: var(--color-text-footer-hover);
      }
    }
  }
}
</style>