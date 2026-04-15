<template>
  <div
    class="sub-hero relative isolate flex min-h-[min(19.6vh,9.1rem)] items-end overflow-hidden sm:min-h-[min(49vh,22.4rem)] sm:items-center lg:min-h-[min(29.4vh,15.4rem)]"
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
      class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/35"
      aria-hidden="true"
    />
    <div
      class="relative z-10 mx-auto w-full max-w-6xl px-[1.05rem] py-[1.4rem] sm:px-[1.75rem] sm:py-[2.45rem] lg:py-[3.5rem]"
    >
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
.sub-hero {
  border-bottom: 10px solid var(--color-brand);
  h1 {
    font-size: 2.5rem;
  }
}
</style>