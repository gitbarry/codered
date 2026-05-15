<template>
  <div
    class="hero relative isolate flex min-h-[min(28vh,13rem)] items-end overflow-hidden sm:min-h-[min(70vh,32rem)] sm:items-center lg:min-h-[min(42vh,22rem)]"
    :aria-labelledby="titleId"
  >
    <img
      :src="backgroundImage"
      alt=""
      class="pointer-events-none absolute inset-0 h-full w-full object-cover"
      width="1920"
      height="1080"
      decoding="async"
      fetchpriority="high"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/25"
      aria-hidden="true"
    />
    <div class="relative z-10 mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 sm:py-14 lg:py-20">
      <h1
        :id="titleId"
        class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-8xl"
      >
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** URL or path, e.g. `/hero.jpg` in `public/` or an absolute image URL */
    backgroundImage: string
    title?: string
    subtitle?: string
  }>(),
  {
    title: 'CODE : RED',
    subtitle: 'Newquay\'s No1 Drum & Bass Nights'
  }
)

const titleId = useId()
</script>

<style scoped lang="postcss">
.hero {
  border-bottom: 10px solid black;
  @media (min-width: 768px) {
    padding-top: 4rem;
  }
}
</style>