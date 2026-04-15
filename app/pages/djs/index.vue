<template>
  <SubHero
    title="Meet the Team"
    subtitle="Meet the resident DJ's behind Code Red."
    background-image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
  />
  <div class="px-4 mx-auto w-full max-w-6xl">
    <header class="mb-6 ">
      <PageTitle title="The CODE RED resident DJs" />
      <p class="max-w-2xl text-lg text-zinc-600">
        Meet the resident DJ's behind Code Red.
      </p>
    </header>

    <p v-if="pending" class="mt-6 text-sm text-zinc-500">Loading DJs from Storyblok...</p>
    <p v-else-if="error" class="mt-6 text-sm text-red-600">
      Could not load DJs from Storyblok. Please check your API token and content structure.
    </p>
    <p v-else-if="!djsList.length" class="mt-6 text-sm text-zinc-500">
      No DJs found in Storyblok yet.
    </p>

    <ul v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
      <li v-for="player in djsList" :key="player.slug">
        <article
          class="cd-card group flex h-full flex-col overflow-hidden rounded-xl transition hover:border-red-400/60 hover:bg-white hover:shadow-md"
        >
          <NuxtLink
            :to="`/djs/${player.slug}`"
            :aria-label="`View full profile: ${player.title}`"
            class="block aspect-[4/3] overflow-hidden bg-zinc-200 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <img
              :src="player.image"
              :alt="player.title"
              class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              width="800"
              height="600"
              loading="lazy"
            />
          </NuxtLink>
          <div class="flex flex-1 flex-col p-5">
            <h2 class="text-xl font-semibold text-zinc-900 group-hover:text-red-600">
              {{ player.title }}
            </h2>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
              {{ player.excerpt || player.description }}
            </p>
            <NuxtLink
              :to="`/djs/${player.slug}`"
              class="button small mt-4"
            >
              View full profile
            </NuxtLink>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ISbStoryData } from '@storyblok/js'

useHead({ title: 'The CODE RED resident DJs' })

type Dj = {
  slug: string
  title: string
  image: string
  excerpt: string
  description: string
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'

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

function normalizeDescription(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  const text = richTextToPlainText(value).replace(/\s+/g, ' ').trim()
  return text
}

function getImageUrl(value: unknown): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'filename' in value) {
    const filename = (value as { filename?: unknown }).filename
    if (typeof filename === 'string') return filename
  }
  return FALLBACK_IMAGE
}

function mapDjStory(story: ISbStoryData): Dj {
  const content = story.content as Record<string, unknown>
  return {
    slug: story.slug,
    title: String(content.title ?? content.Title ?? story.name ?? 'Untitled DJ'),
    image: getImageUrl(
      content.profile_image ?? content.profileImage ?? content.image ?? content.Image
    ),
    excerpt: normalizeDescription(content.excerpt ?? content.Excerpt ?? content.Excert),
    description:
      normalizeDescription(content.description ?? content.Biography) || 'Biography coming soon.'
  }
}

const storyblokApi = useStoryblokApi()
const { data: displayPlayers, pending, error } = await useAsyncData<Dj[]>(
  'storyblok-djs',
  async () => {
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'dj-s/',
      version: 'draft',
      per_page: 100,
      filter_query: {
        component: { in: 'DJ' }
      }
    })
    return data.stories.map(mapDjStory)
  }
)

const djsList = computed(() => displayPlayers.value ?? [])
</script>

<style scoped lang="postcss">
.tagline {
  color: var(--color-brand);
}

.cd-card {
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
border-bottom: 5px solid #e0dddd;
}
</style>