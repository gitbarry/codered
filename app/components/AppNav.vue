<template>
  <div class="flex items-center gap-4">
    <nav
      class="main-menu hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium sm:flex"
      aria-label="Main"
    >
      <NuxtLink
        v-for="link in nav"
        :key="link.to"
        :to="link.to"
        class="menu-item"
        active-class="menu-item-active"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <div class="sm:hidden">
      <button
        type="button"
        class="menu-toggle-button rounded-md p-2.5 text-white transition hover:bg-zinc-800/80"
        :aria-expanded="menuOpen"
        aria-controls="mobile-main-menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">Open menu</span>
        <svg
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="menuOpen"
        id="mobile-main-menu"
        class="mobile-overlay fixed inset-0 z-[100] flex flex-col bg-zinc-950"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div
          class="flex shrink-0 items-center justify-end border-b border-zinc-800 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))]"
        >
          <button
            type="button"
            class="close-menu-button rounded-md p-2 text-white transition hover:bg-zinc-800/80"
            aria-label="Close menu"
            @click="closeMenu"
          >
            <svg
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav
          class="mobile-menu flex flex-1 flex-col overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6"
          aria-label="Main"
        >
          <NuxtLink
            v-for="link in nav"
            :key="link.to"
            :to="link.to"
            class="mobile-menu-item py-4 text-lg font-medium"
            active-class="mobile-menu-item-active"
            @click="closeMenu"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/djs', label: 'The DJs' },
  { to: '/contact', label: 'Contact' },
  { to: '/foreverdays', label: 'Foreverdays' }
] as const

const menuOpen = ref(false)
const route = useRoute()

function closeMenu() {
  menuOpen.value = false
}

watch(() => route.fullPath, closeMenu)

watch(menuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped lang="postcss">
.mobile-menu-item {
  color: var(--color-text-menu);
  border-bottom: 1px solid var(--color-brand);
  &:hover {
    color: var(--color-text-menu-hover);
  }
}
.mobile-menu-item-active {
  color: var(--color-text-menu-active);
  &:hover {
    color: var(--color-text-menu-active-hover);
  }
}
.menu-item {
  color: var(--color-text-menu);
  &:hover {
    color: var(--color-text-menu-hover);
  }
}
.menu-item-active {
  color: var(--color-text-menu-active);
  &:hover {
    color: var(--color-text-menu-active-hover);
  }
}
</style>
