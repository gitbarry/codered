<template>
  <article>
    <PageTitle variant="page">About</PageTitle>
    <p class="leading-relaxed text-zinc-600">
      This site is a starting point: Nuxt 4, Vue 3, and Tailwind for layout and responsive
      behavior. Content is static for now, so you can edit copy in the Vue files or move it into
      JSON or a CMS when you are ready.
    </p>
    <p class="leading-relaxed text-zinc-600">
      Foreverdays uses its own layout and branding for the charity side of the project, including a
      link out to JustGiving for donations.
    </p>

  </article>
</template>

<script setup lang="ts">
useHead({ title: 'About' })
definePageMeta({
  layout: 'page'
})

</script>
