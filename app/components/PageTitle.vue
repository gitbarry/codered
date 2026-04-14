<template>
    <h1>
      {{ title }}
    </h1>
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
}
</style>