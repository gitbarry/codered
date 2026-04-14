<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <header class="mb-6 space-y-3">
      <PageTitle title="News" />
      <p class="max-w-2xl text-lg text-zinc-600">
        Latest updates from Code Red.
      </p>
    </header>

    <div class="grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-start">
      <div class="min-w-0">
        <p v-if="pending" class="mt-6 text-sm text-zinc-500">Loading news from Storyblok...</p>
        <p v-else-if="error" class="mt-6 text-sm text-red-600">
          Could not load news from Storyblok. Please check your API token and content structure.
        </p>
        <p v-else-if="!items.length" class="mt-6 text-sm text-zinc-500">
          No published news yet.
        </p>

        <ul v-else class="divide-y divide-zinc-200 border-y border-zinc-200" role="list">
          <li v-for="item in items" :key="item.slug">
            <article
              class="group flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-6 sm:py-8"
            >
              <div
                class="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-zinc-200 sm:aspect-square sm:w-40 md:w-48"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  width="320"
                  height="200"
                  loading="lazy"
                />
              </div>
              <div class="flex min-w-0 flex-1 flex-col">
                <p class="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  <span v-if="item.dateLabel">{{ item.dateLabel }}</span>
                  <span v-if="item.dateLabel && item.author"> · </span>
                  <span v-if="item.author">{{ item.author }}</span>
                </p>
                <h2 class="mt-2 text-xl font-semibold text-zinc-900 group-hover:text-red-600">
                  {{ item.title }}
                </h2>
                <p class="mt-2 text-sm leading-relaxed text-zinc-600">
                  {{ item.excerpt }}
                </p>
                <NuxtLink
                  :to="`/news/${item.slug}`"
                  class="button small mt-4 self-start"
                >
                  Read more
                </NuxtLink>
              </div>
            </article>
          </li>
        </ul>
      </div>

      <aside class="rounded-xl border border-zinc-200 bg-zinc-50 p-5 lg:sticky lg:top-6">
        <h3 class="text-lg font-semibold text-zinc-900">
          sidebar
        </h3>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISbStoryData } from '@storyblok/js'

useHead({ title: 'News' })

type NewsCard = {
  slug: string
  title: string
  image: string
  excerpt: string
  author: string
  dateLabel: string
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'

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

function isPublished(content: Record<string, unknown>): boolean {
  const v = content.published ?? content.Published
  return v === true || v === 'true' || v === 1
}

function formatNewsDate(value: unknown): string {
  if (value == null || value === '') return ''
  const d = new Date(String(value))
  if (Number.isNaN(d.getTime())) return String(value).trim()
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function mapNewsStory(story: ISbStoryData): NewsCard | null {
  const content = story.content as Record<string, unknown>
  if (!isPublished(content)) return null

  const excerpt = normalizeText(content.excerpt ?? content.Excerpt)
  const title = String(content.title ?? content.Title ?? story.name ?? 'Untitled')

  return {
    slug: story.slug,
    title,
    image: getImageUrl(content.image ?? content.Image),
    excerpt: excerpt || normalizeText(content.content ?? content.Content).slice(0, 220) || 'Read the full story.',
    author: String(content.author ?? content.Author ?? ''),
    dateLabel: formatNewsDate(content.date ?? content.Date)
  }
}

const storyblokApi = useStoryblokApi()
const { data: newsList, pending, error } = await useAsyncData<NewsCard[]>(
  'storyblok-news',
  async () => {
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'news/',
      version: 'draft',
      per_page: 100,
      // Field keys match your Storyblok schema (Title-case), not lowercase
      sort_by: 'content.Date:desc',
      filter_query: {
        component: { in: 'News' },
        Published: { is: true }
      }
    })
    return data.stories
      .map(mapNewsStory)
      .filter((x): x is NewsCard => x !== null)
  }
)

const items = computed(() => newsList.value ?? [])
</script>
