<template>
  <div class="mx-auto max-w-xl">
    <div>
      <PageTitle title="Contact" />
      <p class="mt-3 text-zinc-600">
        Static placeholder form — wire this to your backend or a form provider when you are ready.
      </p>
    </div>
    <form class="space-y-5" @submit.prevent="onSubmit">
      <div>
        <label for="name" class="mb-1.5 block text-sm font-medium text-zinc-700">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          autocomplete="name"
          class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/40"
          placeholder="Your name"
        />
      </div>
      <div>
        <label for="email" class="mb-1.5 block text-sm font-medium text-zinc-700">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          class="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/40"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label for="message" class="mb-1.5 block text-sm font-medium text-zinc-700">Message</label>
        <textarea
          id="message"
          v-model="message"
          name="message"
          rows="5"
          class="w-full resize-y rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/40"
          placeholder="Say hello…"
        />
      </div>
      <button
        type="submit"
        class="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 sm:w-auto"
      >
        Send (demo only)
      </button>
      <p v-if="submitted" class="text-sm text-emerald-700" role="status">
        Thanks — this demo does not send anywhere yet.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact' })

const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

function onSubmit() {
  submitted.value = true
}
definePageMeta({
  layout: 'page'
})
</script>
