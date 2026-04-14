<template>
  <header class="mb-6 ">
    <h1>
      {{ title }}
    </h1>
  </header>
</template>

<script setup lang="ts">
/** Main page title (h1). */
withDefaults(
  defineProps<{
    title?: string
  }>(),
  { title: 'Page Title' },
)

</script>
<style scoped lang="postcss">
h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>