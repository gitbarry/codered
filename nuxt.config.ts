// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/design-tokens.css'],
  modules: ['@nuxtjs/tailwindcss', '@storyblok/nuxt'],
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    apiOptions: {
      region: 'eu'
    }
  },
  runtimeConfig: {
    public: {
      // Set NUXT_PUBLIC_FOREVERDAYS_JUSTGIVING_URL in .env to your campaign/fundraising page
      foreverdaysJustGivingUrl:
        process.env.NUXT_PUBLIC_FOREVERDAYS_JUSTGIVING_URL ||
        'https://www.justgiving.com/fundraising/'
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Site',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A Nuxt site with static pages.' }
      ]
    }
  }
})
