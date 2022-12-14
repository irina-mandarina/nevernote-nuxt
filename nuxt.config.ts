// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig ({
  modules: [
    '@pinia/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    '@nuxtjs/tailwindcss'
  ],
})