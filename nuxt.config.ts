// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig ({
  modules: [
    '@pinia/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@nuxtjs/tailwindcss'
  ],
  plugins: [
    {src: '~/plugins/Vuelidate'}
  ],
  // build: {
  //   vendor: [
  //     'vuelidate'
  //   ]
  // }
})