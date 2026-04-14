<template>
  <article class="py-10">
    <header class="space-y-4 text-center sm:text-left">
      <p class="text-sm font-medium uppercase tracking-widest text-amber-300/95">Charity</p>
      <h1 class="text-4xl font-bold tracking-tight text-amber-50 sm:text-5xl">
        Foreverdays
      </h1>
      <p class="mx-auto max-w-2xl text-lg leading-relaxed text-teal-100/85 sm:mx-0">
        Foreverdays is presented under its own identity to reflect its charitable purpose. Your
        support helps fund the work we do with communities and partners — transparently, through
        JustGiving.
      </p>
    </header>

    <section
      class="rounded-2xl border border-amber-400/25 bg-teal-900/40 p-6 shadow-lg shadow-teal-950/40 sm:p-8"
      aria-labelledby="donate-heading"
    >
      <h2 id="donate-heading" class="text-2xl font-semibold text-amber-50">
        Donate securely
      </h2>
      <p class="mt-3 max-w-xl text-teal-100/85">
        We collect donations through JustGiving so payments are handled on a trusted platform with
        Gift Aid where eligible. Replace the link below with your live fundraising or campaign URL
        via <code class="rounded bg-teal-950/80 px-1.5 py-0.5 text-sm text-teal-200">NUXT_PUBLIC_FOREVERDAYS_JUSTGIVING_URL</code>
        in your environment.
      </p>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          :href="donateUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-3.5 text-base font-semibold text-teal-950 shadow-md transition hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950"
        >
          Donate on JustGiving
        </a>
        <p class="text-sm text-teal-200/70">
          Opens justgiving.com in a new tab
        </p>
      </div>
    </section>

    <section class="space-y-4 rounded-2xl border border-teal-800/60 bg-teal-900/25 p-6 sm:p-8">
      <h2 class="text-xl font-semibold text-amber-50">About this initiative</h2>
      <div class="space-y-3 text-teal-100/85">
        <p>
          Use this space for your mission statement, how funds are used, trustees or partner
          organisations, and any regulatory wording your charity requires.
        </p>
        <p>
          The main music or arts site keeps its own look and feel; Foreverdays stays visually
          distinct so visitors recognise they are supporting charitable activity.
        </p>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'foreverdays'
})

const config = useRuntimeConfig()
const donateUrl = computed(() => config.public.foreverdaysJustGivingUrl as string)

useHead({
  title: 'Foreverdays — Donate via JustGiving',
  titleTemplate: '%s'
})

useSeoMeta({
  description:
    'Donate to the Foreverdays charity initiative securely through JustGiving. Distinct from our main creative site.'
})
</script>
