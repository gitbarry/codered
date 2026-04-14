<template>
  <div class="py-10 px-4 mx-auto w-full max-w-6xl">
    <NuxtLink
      to="/djs"
      class="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
    >
      ← The DJs
    </NuxtLink>

    <p v-if="pending" class="mt-6 text-sm text-zinc-500">Loading DJ profile...</p>
    <p v-else-if="error" class="mt-6 text-sm text-red-600">
      Could not load this DJ from Storyblok.
    </p>

    <article v-else-if="player" class="grid gap-10 md:grid-cols-12 md:gap-12">
      <div class="md:col-span-4">
        <img
          :src="player.image"
          :alt="player.title"
          class="aspect-[4/3] rounded-xl w-full border border-zinc-200 object-cover lg:aspect-auto"
          width="339"
          height="226"
        />
      </div>
      <div class="space-y-6 md:col-span-8">
        <header>
          <p class="tagline text-sm font-medium uppercase tracking-widest text-red-600">
            DJ
          </p>
          <PageTitle :title="player.title" />
        </header>
        <div class="space-y-4 text-zinc-700">
          <p v-for="(para, i) in bioParagraphs" :key="i" class="leading-relaxed">
            {{ para }}
          </p>
          <SoundCloudEmbed v-if="player.soundcloud" :url="player.soundcloud" :color="'#990000'" />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { ISbStoryData } from '@storyblok/js'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

type DjProfile = {
  slug: string
  title: string
  image: string
  excerpt: string
  biography: string
  soundcloud: string
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'

function richTextToPlainText(node: unknown): string {
  if (typeof node === 'string') return node
  if (!node || typeof node !== 'object') return ''

  const maybeNode = node as { text?: string; content?: unknown[] }
  if (typeof maybeNode.text === 'string') return maybeNode.text
  if (Array.isArray(maybeNode.content)) {
    return maybeNode.content.map((child) => richTextToPlainText(child)).join(' ')
  }
  return ''
}

function normalizeText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  return richTextToPlainText(value).replace(/\s+/g, ' ').trim()
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'filename' in value) {
    const filename = (value as { filename?: unknown }).filename
    if (typeof filename === 'string') return filename
  }
  return FALLBACK_IMAGE
}

function mapStoryToDjProfile(story: ISbStoryData): DjProfile {
  const content = story.content as Record<string, unknown>
  return {
    slug: story.slug,
    title: String(content.title ?? content.Title ?? story.name ?? 'Untitled DJ'),
    image: getImageUrl(
      content.profile_image ?? content.profileImage ?? content.image ?? content.Image
    ),
    excerpt: normalizeText(content.excerpt ?? content.Excerpt ?? content.Excert),
    biography: normalizeText(content.description ?? content.Biography) || 'Biography coming soon.',
    soundcloud: String(content.soundcloud ?? content.Soundcloud ?? '')
  }
}

const storyblokApi = useStoryblokApi()
const { data: player, pending, error } = await useAsyncData<DjProfile>(
  () => `player-${slug.value}`,
  async () => {
    try {
      const { data } = await storyblokApi.get(`cdn/stories/dj-s/${slug.value}`, {
        version: 'draft'
      })
      return mapStoryToDjProfile(data.story)
    } catch {
      throw createError({ statusCode: 404, statusMessage: 'DJ not found' })
    }
  },
  { watch: [slug] }
)

const bioParagraphs = computed(() => {
  const p = player.value
  if (!p) return []
  return p.biography.split(/\n\n+/).map((x) => x.trim()).filter(Boolean)
})

useHead(() => ({
  title: player.value?.title ?? 'DJ',
  titleTemplate: '%s'
}))

useSeoMeta({
  description: () =>
    player.value
      ? `${player.value.title} — ${player.value.excerpt || player.value.biography}`
      : 'Code Red DJ profile'
})
</script>

<style scoped lang="postcss">
.tagline {
  color: var(--color-brand);
}
</style>