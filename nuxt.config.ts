// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/styles/main.css'
  ]
})