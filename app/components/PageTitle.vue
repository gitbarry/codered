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
  border-bottom: 10px solid var(--color-brand);
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    display: flex;
    width: 50%;
    height: 10px;
    background-color: black;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(100%);
  }
}
</style>