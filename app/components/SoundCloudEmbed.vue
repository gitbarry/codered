<template>
  <div class="w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm">
    <iframe
      title="SoundCloud player"
      class="w-full"
      :height="resolvedHeight"
      scrolling="no"
      frameborder="0"
      allow="autoplay; clipboard-write"
      loading="lazy"
      :src="embedSrc"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * Public SoundCloud URL for a track, playlist, or profile stream, e.g.
     * `https://soundcloud.com/artist/track-name`
     */
    url: string
    /** Pixel height; defaults by `visual` if omitted */
    height?: number
    /** Large visual player vs compact waveform */
    visual?: boolean
    autoPlay?: boolean
    hideRelated?: boolean
    showComments?: boolean
    showUser?: boolean
    /** Accent colour, e.g. `#ff5500` or `ff5500` */
    color?: string
  }>(),
  {
    visual: false,
    autoPlay: false,
    hideRelated: false,
    showComments: true,
    showUser: true,
    color: '#ff5500'
  }
)

const resolvedHeight = computed(() => {
  if (props.height != null) return props.height
  return props.visual ? 450 : 166
})

const embedSrc = computed(() => {
  const hex = props.color.replace(/^#/, '')
  const params = new URLSearchParams({
    url: props.url.trim(),
    color: `#${hex}`,
    auto_play: String(props.autoPlay),
    hide_related: String(props.hideRelated),
    show_comments: String(props.showComments),
    show_user: String(props.showUser),
    show_reposts: 'false',
    show_teaser: 'true',
    visual: String(props.visual)
  })
  return `https://w.soundcloud.com/player/?${params.toString()}`
})
</script>
