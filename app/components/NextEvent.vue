<template>
  <section
    class="next-event py-8 bg-[var(--color-background-section-odd)]"
    aria-labelledby="next-event-title"
  >
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
      <h3 id="next-event-title" class="text-2xl font-bold tracking-tight text-zinc-900">
        {{ title }}
      </h3>
      <p v-for="(text, i) in paragraphs" :key="i" class="text-lg text-zinc-600">
        {{ text }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string[]
}>()
</script>
