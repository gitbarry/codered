<template>
  <div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <header class="mb-6 space-y-3">
      <NuxtLink
        to="/news"
        class="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
      >
        ← News
      </NuxtLink>
      <PageTitle title="News" />
      <p class="max-w-2xl text-lg text-zinc-600">
        Latest updates from Code Red.
      </p>
    </header>

    <div class="grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-start">
      <div class="min-w-0">
        <p v-if="pending" class="text-sm text-zinc-500">Loading article...</p>
        <p v-else-if="error" class="text-sm text-red-600">
          Could not load this article from Storyblok.
        </p>

        <article v-else-if="article" class="space-y-8">
          <header class="space-y-3">
            <h2 class="mb-8 text-5xl font-bold text-zinc-900">
              {{ article.title }}
            </h2>
            <p class="text-sm text-zinc-600">
              <span v-if="article.dateLabel">{{ article.dateLabel }}</span>
              <span v-if="article.dateLabel && article.author"> · </span>
              <span v-if="article.author">{{ article.author }}</span>
            </p>
          </header>

          <div class="aspect-[21/9] max-h-96 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200">
            <img
              :src="article.image"
              :alt="article.title"
              class="h-full w-full object-cover"
              width="1200"
              height="514"
            />
          </div>

          <div
            v-if="article.contentDoc"
            class="news-rich-text max-w-3xl space-y-4 text-zinc-800"
          >
            <StoryblokRichText :doc="article.contentDoc" />
          </div>
          <p v-else class="text-zinc-600">
            No content for this article yet.
          </p>
        </article>
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
import type { ISbStoryData, StoryblokRichTextDocumentNode } from '@storyblok/js'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

type NewsArticle = {
  slug: string
  title: string
  image: string
  author: string
  dateLabel: string
  published: boolean
  contentDoc: StoryblokRichTextDocumentNode | null
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'

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

function asRichTextDoc(value: unknown): StoryblokRichTextDocumentNode | null {
  if (!value || typeof value !== 'object') return null
  const doc = value as { type?: string }
  if (doc.type === 'doc') {
    return value as StoryblokRichTextDocumentNode
  }
  return null
}

function mapStoryToArticle(story: ISbStoryData): NewsArticle {
  const content = story.content as Record<string, unknown>
  return {
    slug: story.slug,
    title: String(content.title ?? content.Title ?? story.name ?? 'Untitled'),
    image: getImageUrl(content.image ?? content.Image),
    author: String(content.author ?? content.Author ?? ''),
    dateLabel: formatNewsDate(content.date ?? content.Date),
    published: isPublished(content),
    contentDoc: asRichTextDoc(content.content ?? content.Content)
  }
}

const storyblokApi = useStoryblokApi()
const { data: article, pending, error } = await useAsyncData<NewsArticle | null>(
  () => `news-${slug.value}`,
  async () => {
    try {
      const { data } = await storyblokApi.get(`cdn/stories/news/${slug.value}`, {
        version: 'draft'
      })
      const mapped = mapStoryToArticle(data.story)
      if (!mapped.published) {
        throw createError({ statusCode: 404, statusMessage: 'Article not found' })
      }
      return mapped
    } catch {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' })
    }
  },
  { watch: [slug] }
)

useHead(() => ({
  title: article.value?.title ?? 'News',
  titleTemplate: '%s'
}))

useSeoMeta({
  description: () =>
    article.value
      ? `${article.value.title} — Code Red news`
      : 'Code Red news'
})
</script>

<style scoped lang="postcss">
.news-rich-text :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}
.news-rich-text :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
.news-rich-text :deep(h3) {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
.news-rich-text :deep(ul),
.news-rich-text :deep(ol) {
  margin: 0.75rem 0 1rem 1.25rem;
}
.news-rich-text :deep(a) {
  color: var(--color-brand, #b91c1c);
  text-decoration: underline;
}
.news-rich-text :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
</style>
