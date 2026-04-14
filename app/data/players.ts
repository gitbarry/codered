export interface Player {
  slug: string
  /** Display name */
  name: string
  /** Short line under the name, e.g. style or residency */
  tagline: string
  excerpt: string
  image: string
  bio: string
  soundcloudUrl: string
}

export const players: Player[] = [
  {
    slug: 'dj-corp',
    name: 'DJ Corp',
    tagline: 'Liquid & rollers · resident',
    excerpt:
      'Warm basslines and crisp breaks — Lex builds sets that move from sunset grooves into peak-time rollers without losing the thread.',
    image: 'https://images.unsplash.com/photo-1571266028243-eaa6bb7ea3bd?w=800&q=80',
    bio: `Lex Vane started on bedroom decks in Bristol before landing a residency on the south-west circuit. Known for long blends and a crate heavy on modern liquid, they have supported several international acts on UK tours.

At Code Red, Lex closes the early room and hands off when the tempo shifts — a favourite for crowds who want melody before the weight drops.

Outside the booth, Lex runs a small mix series highlighting producers from Cornwall and Devon.`,
    soundcloudUrl: 'https://soundcloud.com/cause4concern-recordings/sets/va-flavours-vol-2-ltdc4c036'
  },
  {
    slug: 'leroy',
    name: 'Leroy',
    tagline: 'Neurofunk & tech-step',
    excerpt:
      'Tight drums and metallic textures — Mira J favours precision and impact, with sets that feel engineered as much as mixed.',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
    bio: `Mira J cut her teeth on DAWs before turntables, which shows in the surgical edits and layered percussion of her live sets. She has released on a handful of boutique labels and prefers intimate rooms where detail actually lands.

Code Red bookings lean on her for the second-room energy: darker, faster, and unapologetically heavy.

She also mentors younger DJs on EQ and phase — ask her about sub management and she will talk your ear off.`,
    soundcloudUrl: 'https://soundcloud.com/cause4concern-recordings/sets/va-flavours-vol-2-ltdc4c036'
  },
  {
    slug: 'jello',
    name: 'Jello',
    tagline: 'Neurofunk & tech-step',
    excerpt:
      'Tight drums and metallic textures — Mira J favours precision and impact, with sets that feel engineered as much as mixed.',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
    bio: `Mira J cut her teeth on DAWs before turntables, which shows in the surgical edits and layered percussion of her live sets. She has released on a handful of boutique labels and prefers intimate rooms where detail actually lands.

Code Red bookings lean on her for the second-room energy: darker, faster, and unapologetically heavy.

She also mentors younger DJs on EQ and phase — ask her about sub management and she will talk your ear off.`,
    soundcloudUrl: 'https://soundcloud.com/cause4concern-recordings/sets/va-flavours-vol-2-ltdc4c036'
  },
  {
    slug: 'bremlin',
    name: 'Bremlin',
    tagline: 'Neurofunk & tech-step',
    excerpt:
      'Tight drums and metallic textures — Mira J favours precision and impact, with sets that feel engineered as much as mixed.',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
    bio: `Mira J cut her teeth on DAWs before turntables, which shows in the surgical edits and layered percussion of her live sets. She has released on a handful of boutique labels and prefers intimate rooms where detail actually lands.

Code Red bookings lean on her for the second-room energy: darker, faster, and unapologetically heavy.

She also mentors younger DJs on EQ and phase — ask her about sub management and she will talk your ear off.`,
    soundcloudUrl: 'https://soundcloud.com/cause4concern-recordings/sets/va-flavours-vol-2-ltdc4c036'
  },
  {
    slug: 'wyefi',
    name: 'Wyfi',
    tagline: 'Neurofunk & tech-step',
    excerpt:
      'Tight drums and metallic textures — Mira J favours precision and impact, with sets that feel engineered as much as mixed.',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
    bio: `Mira J cut her teeth on DAWs before turntables, which shows in the surgical edits and layered percussion of her live sets. She has released on a handful of boutique labels and prefers intimate rooms where detail actually lands.

Code Red bookings lean on her for the second-room energy: darker, faster, and unapologetically heavy.

She also mentors younger DJs on EQ and phase — ask her about sub management and she will talk your ear off.`,
    soundcloudUrl: 'https://soundcloud.com/cause4concern-recordings/sets/va-flavours-vol-2-ltdc4c036'
  },
  {
    slug: 'emu',
    name: 'Emu',
    tagline: 'Jungle revival · MC-friendly',
    excerpt:
      'Breaks that bite and bass that rolls — Kid Hertz bridges classic jungle flavours with today’s production polish.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    bio: `Kid Hertz collects dubplates and white labels like postcards. His sets nod to golden-era jungle while keeping kicks and subs firmly in 2020s club territory — MCs love the pockets he leaves for bars.

He has played Code Red since the first season and often opens the main room to set the tempo for the night.

When not gigging, he restores old 12\"s and posts short clips of needle drops — no algorithm, just vibes.`,
    soundcloudUrl: 'https://soundcloud.com/cause4concern-recordings/sets/va-flavours-vol-2-ltdc4c036'
  }
]

export function getPlayerBySlug(slug: string): Player | undefined {
  return players.find((p) => p.slug === slug)
}
